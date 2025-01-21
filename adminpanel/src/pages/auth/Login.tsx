import { useState } from 'react';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
// import { button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import authService from '@/services/adminapp/admin';
import { login } from '@/redux/features/authSlice';
import { useAppDispatch } from '@/redux/redux-hooks';
import { setShopTenantState } from '@/redux/features/appSlice';
import { useSelector } from 'react-redux';
import { getItem } from '@/utils/storage';

interface LoginFields {
  email: string;
  password: string;
}

const Login = () => {
  const { toast } = useToast();
  const form = useForm<LoginFields>();
  const dispatch = useAppDispatch();
  const localSysConfig: any = getItem('SYSTEM_CONFIG');
  const systemConfig = useSelector(
    (state: any) => state.authState.systemConfig
  );

  const ToastHandler = (text: string) => {
    return toast({
      description: text,
      className: cn(
        'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
      ),
      style: {
        backgroundColor: 'red',
        color: 'white',
      },
    });
  };
  // console.log('🚀 ~ Login ~ systemConfig:', systemConfig);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const loginHandler = async (data: LoginFields) => {
    setIsLoader(true);
    const userData = {
      identifier: data.email.trim().replace(/\s+/g, ''),
      password: data.password,
    };
    try {
      const user = await authService.loginService(userData);
      if (user.data.success) {
        setIsLoader(false);
        const { tenantConfig, ...rest } = user.data.data;
        dispatch(login(rest));
        dispatch(setShopTenantState(tenantConfig));
      } else {
        ToastHandler(user.data.message);
        setIsLoader(false);
      }
    } catch (err: Error | any) {
      setIsLoader(false);
      ToastHandler(err?.response?.data?.message);
      console.log('🚀 ~ loginHandler ~ error:', err?.response?.data?.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex  h-full w-full items-center justify-center bg-background">
      <div className="mx-auto flex w-full items-start justify-around max-[1560px]:items-center">
        <div className="w-[30%] self-start px-[30px]">
          <div className="flex max-h-[29px] w-full max-w-[600px] items-center justify-center px-[25px] py-[40px]">
            <img
              src={
                systemConfig?.tenantLogo
                  ? systemConfig?.tenantLogo
                  : localSysConfig?.tenantLogo
                    ? localSysConfig?.tenantLogo
                    : 'Image is not uploaded'
              }
              alt="login avatar"
              className="mt-10 h-auto w-[150px] object-contain"
            />
          </div>
          <div className="xl:pt-[50px] 2xl:pt-[150px]">
            <Form {...form}>
              <form onSubmit={handleSubmit(loginHandler)}>
                <div className="">
                  <div className="form-group w-full">
                    <FormLabel
                      htmlFor="password"
                      className="text-sm font-medium"
                    >
                      Email / Phone
                    </FormLabel>
                    <FormControl className="m-1 w-full">
                      <div className="mb-2">
                        <Input
                          className="mt-2 text-[11px] outline-none focus:outline-none focus:border-none focus-visible:ring-offset-[1px] focus-visible:ring-0"
                          id="email"
                          placeholder="Enter email or phone"
                          type="text"
                          {...register('email', {
                            required: 'Please enter your email or phone.',
                          })}
                          //   disableUnderline
                        />
                        {errors.email && (
                          <FormMessage>*{errors.email.message}</FormMessage>
                        )}
                      </div>
                    </FormControl>
                  </div>
                  <div className="form-group w-full">
                    <FormItem>
                      <FormLabel
                        htmlFor="password"
                        className="text-sm font-medium"
                      >
                        Password
                      </FormLabel>
                      {/* <FormControl> */}
                      <div className="relative">
                        <Input
                          id="password"
                          placeholder="********"
                          type={passwordVisible ? 'text' : 'password'}
                          className="text-sm pr-10"
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
                          <FormMessage>*{errors.password.message}</FormMessage>
                        )}
                      </div>
                      {/* </FormControl> */}
                    </FormItem>
                  </div>
                  <div className="form-group text-end">
                    <NavLink
                      className="font-open-sans text-[11px] font-normal text-neutral-900 hover:underline"
                      to="../forgot-password"
                    >
                      Forget Password?
                    </NavLink>
                  </div>
                  <div className="mt-8 w-full px-4">
                    <Button
                      disabled={!!isLoader}
                      className="btn-black-fill w-full bg-primary px-16 py-2 text-gray-50"
                      color="inherit"
                      title="Login"
                      type="submit"
                    >
                      {isLoader && <Loader2 className="animate-spin" />}
                      {'Login'}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <div className="w-[60%] px-3 py-2">
          {/* <div className="mx-auto max-w-[800px] overflow-hidden rounded-lg flex justify-center items-center min-h-[800px] min-[1600px]:max-w-[934px] "> */}
          <div className="mx-auto  flex max-h-[834px] items-center justify-center overflow-hidden rounded-lg max-[1560px]:max-h-[96vh]">
            {/* <div className="flex flex-col items-center justify-center">
              <p className="text-xl font-semibold">Image is not uploaded yet</p>
              <span className="text-sm font-medium">
                Hint: You can upload under setting module from setting config
                tab
              </span>
            </div> */}
            {systemConfig?.tenantBanner || localSysConfig?.tenantBanner ? (
              <img
                src={
                  systemConfig?.tenantBanner
                    ? systemConfig?.tenantBanner
                    : localSysConfig?.tenantBanner
                      ? localSysConfig?.tenantBanner
                      : 'Image is not uploaded yet'
                }
                alt="urlaundry"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <p className="text-xl font-semibold">
                  Image is not uploaded yet
                </p>
                <span className="text-sm font-medium">
                  Hint: You can upload under setting module from setting config
                  tab
                </span>
              </div>
            )}
          </div>
        </div>
        {/* {notification && (
              <Notify
                isOpen
                setIsOpen={hideNotification}
                displayMessage={notification}
              />
            )} */}
      </div>
    </div>
  );
};

export default Login;
