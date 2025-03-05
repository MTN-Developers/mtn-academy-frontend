// lib/validations.ts
import { z } from 'zod';

export const paymentIntentSchema = z.object({
  amount: z.number(),
});

export const userSchema = z.object({
  name: z.string({
    required_error: 'برجاء ادخال الاسم',
  }),
  password: z
    .string({
      required_error: 'برجاء ادخال كلمه المرور',
    })
    .min(6, 'كلمه المرور يجب ان تكون اكثر من 6 احرف')
    .max(20, 'كلمه المرور يجب ان تكون اقل من 20 حرف')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#]/,
      'كلمه المرور يجب ان تحتوي علي حرف كبير وحرف صغير ورقم ورموز خاصه',
    ),
  email: z
    .string({
      required_error: 'برجاء ادخال البريد الالكتروني',
    })
    .email('برجاء ادخال البريد الالكتروني بشكل صحيح'),
  country: z.string({
    required_error: 'برجاء اختيار الدولة',
  }),
  countryCode: z.string({
    required_error: 'برجاء ادخال كود الدوله',
  }),
  phone: z.string({
    required_error: 'برجاء ادخال رقم الهاتف',
  }),
  // cardInfo is commented out in the original
});

export const promoCodesSchema = z.object({
  promoCode: z.string({
    required_error: 'Promo Code is required',
  }),
});

export const paymentSchema = z.object({
  cardInfo: z.string({
    required_error: 'برجاء ادخال بيانات البطاقه',
  }),
});

// You can also export these from separate files if needed
// export { loginValidationSchema } from './login-validation-schema';
// export { signUpValidationSchema } from './signup-validation-schema';
