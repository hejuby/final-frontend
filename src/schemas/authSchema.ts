import * as z from "zod";

const emailSchema = z
  .string()
  .email({ message: "올바른 이메일 형식이 아닙니다." });

const passwordSchema = z
  .string()
  .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
  .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
  });

const passwordConfirmSchema = z
  .string()
  .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
  .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.",
  });

const nicknameSchema = z
  .string()
  .max(10, { message: "닉네임은 최대 10자까지 가능합니다." })
  .regex(/^[가-힣a-zA-Z0-9]+$/, {
    message: "닉네임은 한글, 영문, 숫자만 가능합니다.",
  });

const snsSchema = z
  .object({
    NAVER_BLOG: z.string().optional(),
    INSTAGRAM: z.string().optional(),
    YOUTUBE: z.string().optional(),
    TIKTOK: z.string().optional(),
    ETC: z.string().optional(),
  })
  .refine(
    (data) => {
      return Object.values(data).some((value) => value && value.trim() !== "");
    },
    {
      message: "최소한 하나의 SNS URL을 입력해야 합니다.",
    },
  );

const termsSchema = z.object({
  termsOfService: z.boolean().refine((val) => val === true, {
    message: "이용약관에 동의해야 합니다.",
  }),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "개인정보 처리방침에 동의해야 합니다.",
  }),
  marketing: z.boolean().optional(),
});

// 로그인 스키마
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// 회원가입 스키마
export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: passwordConfirmSchema,
    nickname: nicknameSchema,
    signupPath: z.string().nonempty({ message: "가입 경로를 선택해주세요" }),
    sns: snsSchema,
    terms: termsSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
