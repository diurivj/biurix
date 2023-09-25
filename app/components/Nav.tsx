import { NavLink, useFetcher } from '@remix-run/react';
import { Container } from './Container';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from './ui/select';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from './ui/dropdown-menu';
import { supportedLanguages, type Language } from '~/types/language.type';
import { cn } from '~/lib/utils';
import { buttonVariants } from './ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export type NavContent = {
	links: Array<{ name: string; href: string }>;
};

type NavProps = {
	content: NavContent;
	language: Language;
};

export function Nav({ content, language }: NavProps) {
	return (
		<Container
			as='header'
			className='fixed inset-x-0 top-0 grid grid-cols-2 items-center justify-between gap-x-4 border-b border-secondary pb-4 pt-4 lg:grid-cols-[48px_1fr_180px] xl:px-0 xl:pb-2'
		>
			<span className='select-none text-2xl'>&#129312;</span>
			<MobileMenu content={content} language={language} />
			<nav className='hidden justify-center space-x-8 lg:flex'>
				{content.links.map(link => (
					<NavLink
						end
						key={link.name}
						to={link.href}
						className={({ isActive, isPending }) =>
							cn(
								buttonVariants({ variant: 'link' }),
								isActive
									? 'font-bold underline underline-offset-4'
									: 'font-light',
								isPending ? 'opacity-50' : 'opacity-100',
								'transition-all duration-75'
							)
						}
					>
						{link.name}
					</NavLink>
				))}
			</nav>
			<div className='hidden justify-end lg:flex '>
				<LanguageSelect defaultValue={language} />
			</div>
		</Container>
	);
}

function MobileMenu({ content, language }: NavProps) {
	const [open, setOpen] = useState(false);

	return (
		<nav className='flex justify-end lg:hidden'>
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger className='w-fit'>
					<Menu />
				</DropdownMenuTrigger>
				<DropdownMenuContent collisionPadding={10}>
					{content.links.map(link => (
						<DropdownMenuItem key={link.name} className='justify-end'>
							<NavLink
								end
								to={link.href}
								onClick={() => setOpen(false)}
								className={({ isActive, isPending }) =>
									cn(
										isActive
											? 'font-bold underline underline-offset-4'
											: 'font-light',
										isPending ? 'opacity-50' : 'opacity-100',
										'transition-all duration-75'
									)
								}
							>
								{link.name}
							</NavLink>
						</DropdownMenuItem>
					))}
					<DropdownMenuSeparator />
					<div className='flex justify-end p-2'>
						<LanguageSelect defaultValue={language} />
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		</nav>
	);
}

function LanguageSelect({ defaultValue }: { defaultValue: Language }) {
	const lang = defaultValue.toUpperCase();
	const fetcher = useFetcher();

	function handleSubmit(v: string) {
		const formData = new FormData();
		formData.set('language', v);
		fetcher.submit(formData, { method: 'POST', action: '/change-language' });
	}

	return (
		<fetcher.Form>
			<Select defaultValue={defaultValue} onValueChange={handleSubmit}>
				<SelectTrigger className='w-fit'>
					<SelectValue placeholder={lang} />
				</SelectTrigger>
				<SelectContent>
					{supportedLanguages.map(language => (
						<SelectItem key={language} value={language}>
							{language.toUpperCase()}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</fetcher.Form>
	);
}
