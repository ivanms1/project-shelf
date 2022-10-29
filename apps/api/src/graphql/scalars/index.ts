import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';

import builder from '../../builder';

builder.addScalarType('Date', DateTimeResolver, {});
builder.addScalarType('JSON', JSONObjectResolver, {});
