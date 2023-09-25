import * as React from 'react';
import { cn } from '~/lib/utils';

type ContainerProps = {
	as?: React.ElementType;
	className?: string;
	children: React.ReactNode;
};

export function Container({ as = 'div', className, children }: ContainerProps) {
	return React.createElement(
		as,
		{
			className: cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)
		},
		children
	);
}
