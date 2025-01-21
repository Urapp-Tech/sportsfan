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
import { Fields } from '@/interfaces/back-office-user.interface';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  isLoader: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (...args: any[]) => any;
};

const UserCreationDialog = ({
  isOpen,
  setIsOpen,
  callback,
  isLoader,
}: Props) => {
  const form = useForm<Fields>();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: Fields) => {
    callback(data);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="sm:max-w-[600px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add New Admin User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <div className="form-group w-full flex gap-3">
                <FormControl className="m-1 w-full">
                  <div className="">
                    <FormLabel
                      htmlFor="firstName"
                      className="text-sm font-medium"
                    >
                      First Name
                    </FormLabel>
                    <Input
                      className="mt-2 text-[11px] outline-none focus:outline-none focus:border-none focus-visible:ring-offset-[1px] focus-visible:ring-0"
                      id="firstName"
                      placeholder="john"
                      type="text"
                      {...register('firstName', {
                        required: 'Please enter your first name',
                      })}
                    />
                    {errors.firstName && (
                      <FormMessage>*{errors.firstName.message}</FormMessage>
                    )}
                  </div>
                </FormControl>
                <FormControl className="m-1 w-full">
                  <div className="">
                    <FormLabel
                      htmlFor="lastName"
                      className="text-sm font-medium"
                    >
                      First Name
                    </FormLabel>
                    <Input
                      className="mt-2 text-[11px] outline-none focus:outline-none focus:border-none focus-visible:ring-offset-[1px] focus-visible:ring-0"
                      id="lastName"
                      placeholder="doe"
                      type="text"
                      {...register('lastName', {
                        required: 'Please enter your last name',
                      })}
                    />
                    {errors.lastName && (
                      <FormMessage>*{errors.lastName.message}</FormMessage>
                    )}
                  </div>
                </FormControl>
                {/* <FormControl className="m-1 w-full">
                  <div className="">
                    <FormLabel htmlFor="email" className="text-sm font-medium">
                      Eamil
                    </FormLabel>
                    <Input
                      className="mt-2 text-[11px] outline-none focus:outline-none focus:border-none focus-visible:ring-offset-[1px] focus-visible:ring-0"
                      id="email"
                      placeholder="johndoe@gmail.com"
                      type="text"
                      {...register('email')}
                    />
                    {errors.email && (
                      <FormMessage>*{errors.email.message}</FormMessage>
                    )}
                  </div>
                </FormControl> */}
              </div>
              <div className="form-group w-full flex gap-3">
                <FormControl className="m-1 w-full">
                  <div className="">
                    <FormLabel htmlFor="email" className="text-sm font-medium">
                      Eamil
                    </FormLabel>
                    <Input
                      className="mt-2 text-[11px] outline-none focus:outline-none focus:border-none focus-visible:ring-offset-[1px] focus-visible:ring-0"
                      id="email"
                      placeholder="johndoe@gmail.com"
                      type="text"
                      {...register('email', {
                        required: 'Please enter your email',
                      })}
                    />
                    {errors.email && (
                      <FormMessage>*{errors.email.message}</FormMessage>
                    )}
                  </div>
                </FormControl>
                {/* <div className="form-group w-full"> */}
                <FormControl className="m-1 w-full">
                  <div className="">
                    <FormLabel
                      htmlFor="password"
                      className="text-sm font-medium"
                    >
                      Password
                    </FormLabel>
                    <div className="relative">
                      <Input
                        id="password"
                        placeholder="********"
                        type={passwordVisible ? 'text' : 'password'}
                        className="text-sm pr-10 mt-2"
                        {...register('password', {
                          required: 'Please enter your password.',
                        })}
                      />
                      <Button
                        variant="ghost"
                        type="button"
                        className="bg-transparent absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? (
                          <EyeOff color="black" />
                        ) : (
                          <Eye color="black" />
                        )}
                      </Button>
                      {errors.password && (
                        <p>s</p>
                        // <FormMessage>*{errors.password.message}</FormMessage>
                      )}
                    </div>
                  </div>
                </FormControl>
                {/* </div> */}
              </div>
              <div className="form-group w-full flex gap-3">
                <FormControl className="m-1 w-full">
                  <div className="">
                    <FormLabel
                      htmlFor="address"
                      className="text-sm font-medium"
                    >
                      Address
                    </FormLabel>
                    <Input
                      className="mt-2 text-[11px] outline-none focus:outline-none focus:border-none focus-visible:ring-offset-[1px] focus-visible:ring-0"
                      id="address"
                      placeholder="Street 55"
                      type="text"
                      {...register('address')}
                    />
                    {errors.address && (
                      <FormMessage>*{errors.address.message}</FormMessage>
                    )}
                  </div>
                </FormControl>
                <FormControl className="m-1 w-full">
                  <div className="">
                    <FormLabel htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </FormLabel>
                    <Input
                      className="mt-2 text-[11px] outline-none focus:outline-none focus:border-none focus-visible:ring-offset-[1px] focus-visible:ring-0"
                      id="phone"
                      placeholder="876543215"
                      type="number"
                      {...register('phone', {
                        required: 'Please enter your phone',
                      })}
                    />
                    {errors.phone && (
                      <FormMessage>*{errors.phone.message}</FormMessage>
                    )}
                  </div>
                </FormControl>
              </div>
              <DialogFooter className="mt-3">
                <Button disabled={isLoader} type="submit" className="w-24">
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

export default UserCreationDialog;
