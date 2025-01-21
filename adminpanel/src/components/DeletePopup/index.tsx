import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type Props = {
  title: string;
  isLoader: boolean;
  isOpen: boolean;
  formData: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
};

const DeleteDialog = ({
  title,
  isOpen,
  formData,
  setIsOpen,
  callback,
  isLoader,
}: Props) => {
  const handleOnClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Delete {title}</DialogTitle>
        </DialogHeader>
        <div className="">
          <div>
            <p className="text-sm text-gray-700">
              Are you sure you want to delete this {title}?
            </p>
          </div>
          <DialogFooter className="mt-3">
            <Button
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-24"
            >
              No
            </Button>
            <Button
              variant={'outline'}
              disabled={isLoader}
              onClick={() => callback({ id: formData.id, text: 'yes' })}
              className="w-24 hover:bg-red-700 hover:text-white"
            >
              {isLoader && <Loader2 className="animate-spin" />} Delete
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
