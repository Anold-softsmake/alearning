'use client';

import NextLink from 'next/link';
import {forwardRef, type ComponentProps} from 'react';

// The exported site requests route data only when someone follows a link.
// This avoids background RSC requests after a static preview has closed.
const NavigationLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof NextLink>>(
  function NavigationLink(props, ref) {
    return <NextLink {...props} ref={ref} prefetch={false} />;
  },
);

export default NavigationLink;
