import * as React from 'react';
import { cn } from '~/lib/utils';

type Props = {
	as?: React.ElementType;
	className?: string;
	children: JSX.Element | JSX.Element[];
};

export function Container({ as = 'div', className, children }: Props) {
	return React.createElement(
		as,
		{
			className: cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)
		},
		children
	);
}
