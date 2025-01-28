import {
  Dialog,
  DialogContent,
  //   DialogTrigger,
  DialogFooter,
  //   DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Fields } from '@/interfaces/blog.interface';
import { Eye, EyeOff, FileDown, Loader2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DragDropFile from '@/components/DragDropImgFile';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { SingleSelectDropDown } from '@/components/DropDown/SingleSelectDropDown';
import service from '@/services/adminapp/role-permissions';
import { Textarea } from '@/components/ui/textarea';
import assets from '@/assets/images';

type Props = {
  isLoader: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
};

const BlogsCreateDialog = ({
  isOpen,
  setIsOpen,
  callback,
  isLoader,
}: Props) => {
  const form = useForm<Fields>();

  const ToastHandler = (text: string) => {
    return toast({
      description: text,
      className: cn(
        'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 z-[9999]'
      ),
      style: {
        backgroundColor: '#FF5733',
        color: 'white',
        zIndex: 9999,
      },
    });
  };

  const [file, setFile] = useState<any>(null);
  const [selectedImg, setSelectedImg] = useState<any>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [roleLov, setRoleLov] = useState([]);

  const [planFiles, setPlanFiles] = useState<any>(null);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data: Fields) => {
    // if (file) data.images = file;
    callback(data);
    // console.log('sss', data);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const fetchRoleLov = async () => {
    try {
      const roles = await service.lov();
      if (roles.data.success) {
        const lov = roles.data.data.map((el: any) => {
          return {
            name: el.name,
            id: el.id,
          };
        });
        setRoleLov(lov);
      } else {
        console.log('error: ', roles.data.message);
      }
    } catch (error: Error | unknown) {
      console.log('error: ', error);
    }
  };

  const handleFileChange = (onChange: any, event: any) => {
    const selectedFiles = Array.from(event.target.files);
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const validFiles: any[] = [];

    selectedFiles.forEach((file: any) => {
      const fileType = file.type;
      if (allowedImageTypes.includes(fileType)) {
        validFiles.push(file);
      } else {
        ToastHandler(
          'Only .jpeg, .jpg, .png images and .mp4 videos are allowed'
        );
      }
    });

    if (validFiles.length > 0) {
      setPlanFiles((prevFiles: any) => [...prevFiles, ...validFiles]);
      onChange(validFiles);
    }
  };

  const handleFileOnClick = (event: any) => {
    event.target.value = null;
    setPlanFiles([]);
  };

  const handleRemoveFile = (index: number, onChange: any) => {
    setPlanFiles((prevFiles: any) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      onChange(updatedFiles);
      return updatedFiles;
    });
  };

  useEffect(() => {
    fetchRoleLov();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="sm:max-w-[600px] cs-dialog-box"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add New Blog</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="custom-form-section">
              <div className="form-group w-full flex gap-3">
                <FormControl className="m-1 w-full">
                  <div className="">
                    <FormLabel htmlFor="title" className="text-sm font-medium">
                      Title
                    </FormLabel>
                    <Input
                      className="mt-2 text-[11px] outline-none focus:outline-none focus:border-none focus-visible:ring-offset-[1px] focus-visible:ring-0"
                      id="title"
                      placeholder="news"
                      type="text"
                      {...register('title', {
                        required: 'Please enter your title name',
                      })}
                    />
                    {errors.title && (
                      <FormMessage>*{errors.title.message}</FormMessage>
                    )}
                  </div>
                </FormControl>
              </div>
              <div className="form-group w-full flex">
                <FormControl className="m-1 w-full">
                  <div className="">
                    <FormLabel
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
                      Description
                    </FormLabel>
                    <Textarea
                      className="mt-2 text-[11px] outline-none focus:outline-none focus:border-none focus-visible:ring-offset-[1px] focus-visible:ring-0"
                      id="description"
                      placeholder="Type your message here."
                      {...register('description')}
                    />
                  </div>
                </FormControl>
              </div>
              <div>
                <div className="flex justify-between">
                  <FormLabel
                    htmlFor="address"
                    className="text-sm font-medium my-3"
                  >
                    Upload Images
                    <span className="text-xs font-normal">
                      {' '}
                      ( Images should be in JPG, JPEG, or PNG format )
                    </span>
                  </FormLabel>
                </div>
                <div className="">
                  <div className="FormField">
                    <div className="ImageBox">
                      <Controller
                        name="images"
                        control={control}
                        rules={{
                          required: 'Required',
                        }}
                        render={({ field: { onChange } }) => (
                          <>
                            <div className="w-full flex h-[50px] items-center">
                              <input
                                accept="image/jpeg,image/png,image/jpg"
                                style={{ display: 'none' }}
                                id="raised-button-files"
                                type="file"
                                multiple
                                onChange={(event) =>
                                  handleFileChange(onChange, event)
                                }
                                onClick={handleFileOnClick}
                              />
                              <span className="bg-lunar-bg w-full rounded-2xl">
                                <label
                                  htmlFor="raised-button-files"
                                  className="ImageLabel text-white flex h-[50px] justify-center items-center w-full "
                                >
                                  <img
                                    width={22}
                                    src={assets.images.uploadIcon}
                                  />{' '}
                                  <span className="text-white px-1">
                                    Upload
                                  </span>
                                </label>
                              </span>
                            </div>

                            {planFiles && planFiles.length > 0 ? (
                              <div className="mt-2 p-2 rounded-2xl bg-earth-bg">
                                {planFiles.map((file: any, index: number) => (
                                  <div
                                    key={index}
                                    className="ShowFileItem flex items-center"
                                  >
                                    <X
                                      size={20}
                                      className="btn-dot mr-2 cursor-pointer"
                                      onClick={() =>
                                        handleRemoveFile(index, onChange)
                                      }
                                    />
                                    <label className="ShowFileLabel">
                                      {file.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              ''
                            )}
                          </>
                        )}
                      />
                      {errors.images && (
                        <FormMessage>*{errors.images?.message}</FormMessage>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-3">
                <Button
                  disabled={isLoader}
                  type="submit"
                  className="ml-auto w-[148px] h-[35px] bg-venus-bg rounded-[20px] text-[12px] leading-[16px] font-semibold text-quinary-bg"
                >
                  {isLoader && <Loader2 className="animate-spin" />} Add
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogsCreateDialog;
