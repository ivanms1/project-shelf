import { useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'react-i18next';
import Image from 'next/future/image';
import { Loader, Modal } from 'ui';

import ProjectsGrid from '@/components/ProjectsGrid';
import UserInfo from './UserInfo';
import Cropper from '@/components/Cropper';

import {
  useGetUserForPageQuery,
  useGetUserProjectsQuery,
  useUpdateUserMutation,
  useUploadImageMutation,
} from 'apollo-hooks';
import { toast } from 'react-hot-toast';

const COVER_PLACEHOLDER = 'https://via.placeholder.com/1665x288';

const User = () => {
  const [showProfilePic, setShowProfilePic] = useState(false);
  const [image, setImage] = useState();
  const [croppedImage, setCroppedImage] = useState(null);

  const { query } = useRouter();
  const { t } = useTranslation('user');

  const [uploadImage] = useUploadImageMutation();
  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async () => {
    try {
      const res = await uploadImage({
        variables: {
          path: String(croppedImage),
        },
      });
      const updateUserResponse = await updateUser({
        variables: {
          input: {
            avatar: res.data.image,
          },
        },
      });
      if (updateUserResponse) {
        setShowProfilePic(false);
      }

      toast.success('Profile pic changed');
    } catch (error) {
      toast.error('error while updating');
    }
  };

  const { data, loading: userLoading } = useGetUserForPageQuery({
    variables: {
      id: String(query?.id),
    },
    skip: !query?.id,
  });

  const {
    data: projectsData,
    fetchMore,
    loading,
  } = useGetUserProjectsQuery({
    variables: {
      userId: data?.user?.id,
      input: {
        cursor: null,
      },
    },
    skip: !data?.user?.id,
  });

  const { user } = data ?? {};

  const onRefetch = () => {
    if (!projectsData?.getUserProjects?.nextCursor) {
      return;
    }

    fetchMore({
      variables: {
        userId: data?.user?.id,
        input: {
          cursor: projectsData?.getUserProjects?.nextCursor,
        },
      },
    });
  };

  if (userLoading) {
    return (
      <div className='flex justify-center items-center bg-black'>
        <Loader size='lg' />
      </div>
    );
  }

  if (!user) {
    return (
      <div className='w-full h-full flex justify-center items-center bg-black'>
        <p className='text-white'>{t('user_not_found')}</p>
      </div>
    );
  }

  return (
    <div className='bg-black'>
      <div className='relative flex flex-col items-center lg:items-start '>
        <Image
          className='w-full h-[320px] object-cover'
          src={data?.user?.cover ?? COVER_PLACEHOLDER}
          alt={user?.name}
          width={1000}
          height={1000}
        />

        {user?.avatar && (
          <div
            onClick={() => {
              setShowProfilePic(true);
            }}
            className='absolute bottom-[-70px] left-[270px] flex h-[200px] w-[200px]  overflow-hidden'
          >
            <Image
              className='w-full h-[full] object-cover rounded-circle cursor-pointer'
              src={croppedImage || user.avatar}
              alt={user?.name}
              width={200}
              height={2000}
            />
          </div>
        )}
      </div>

      <div className='mt-8 lg:mt-16 py-[40px] w-full max-w-[70vw] m-auto'>
        <UserInfo />
      </div>
      <div className='max-w-[60vw] w-full m-auto flex flex-col mb-[40px]'>
        <span className='text-[35px] mb-[50px]'>Projects</span>
        <ProjectsGrid
          projects={projectsData?.getUserProjects?.results}
          onRefetch={onRefetch}
          loading={loading}
          nextCursor={projectsData?.getUserProjects?.nextCursor}
        />
      </div>

      <Modal
        open={showProfilePic}
        onClose={() => setShowProfilePic(false)}
        modalClassName='bg-grey-dark flex flex-col justify-center p-12 w-[40vw] overflow-hidden'
      >
        <div className='flex flex-col items-center'>
          <p className=' text-[30px] w-full'>Avatar</p>
          {!showProfilePic ? (
            <div className='my-[20px]  rounded-[50%] w-[280px] h-[280px] overflow-hidden'>
              {user?.avatar && (
                <Image
                  src={user?.avatar}
                  alt={user?.name}
                  height={280}
                  width={280}
                />
              )}
            </div>
          ) : (
            <div className='my-[20px]  w-full h-full overflow-hidden'>
              <Cropper
                src={user?.avatar}
                setCroppedImage={setCroppedImage}
                image={image}
                setImage={setImage}
                onSubmit={onSubmit}
              />
            </div>
          )}
        </div>
      </Modal>

      <NextSeo
        title={user?.name}
        description={user?.name}
        openGraph={{
          type: 'website',
          title: user?.name,
          description: user?.bio,
          site_name: 'Project Shelf',
          images: [
            {
              url: user?.avatar ?? '',
              width: 200,
              height: 200,
              alt: user?.name,
            },
          ],
        }}
      />
    </div>
  );
};

export default User;
