"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAuth } from "../../hooks/use-auth"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    username: z
        .string()
        .min(5, "用户名是admin")
        .max(5, "用户名是admin"),
    password: z
        .string()
        .min(0, "密码是元歌")
        .max(10, "密码是元歌"),
})

const LoginForm: React.FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema as any),
        defaultValues: {
            username: "admin",
            password: "",
        },
    })

    const { login } = useAuth();
    const router = useRouter();

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try{
            console.log("登录数据:", data);
            const res=await login(data);
            console.log("登录结果:", res);
            if(res.success){
                // 登录成功，重定向到管理员页面
                router.push("/admin/dashboard");
            }else{
                // 登录失败，显示错误消息
                if(res.status===401){
                    form.setError("password", { message: res.error || "用户名或密码错误" });
                }
            }
        }catch(error){
            console.error("登录失败:", error);
        }
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <Card className="w-full sm:max-w-md ">
                <CardHeader>
                    <CardTitle>登录</CardTitle>
                    <CardDescription>
                        请输入用户名和密码登录
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="username"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            用户名
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-username"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="请输入用户名"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            密码
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-password"
                                            placeholder="请输入密码"
                                            aria-invalid={fieldState.invalid}
                                        />
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter>
                    <Field orientation="responsive">
                        <Button type="submit" form="form-rhf-demo">
                            登录
                        </Button>
                    </Field>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginForm;
