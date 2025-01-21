import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

type Props = {
  title?: string;
};

export const TopBar = ({ title }: Props) => {
  return (
    <header className="bg-white w-full border-b-[1px] fixed top-0 left-50 z-50 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {title}
      </div>
    </header>
  );
};
