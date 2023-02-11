import { useMediaQuery } from '@mantine/hooks';

const useIsMobile = () => useMediaQuery('(max-width: 600px)');

export default useIsMobile;
