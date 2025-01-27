// Core
import { useState } from 'react';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
// React Native
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
// Components
import SpinnerComponent from '@/lib/ui/useable-components/spinner';
// Icon
import Icon from 'react-native-vector-icons/FontAwesome6';
// Schemas
import { SignInSchema } from '@/lib/utils/schema';

// Hook
import useLogin from '@/lib/hooks/useLogin';

// Interface
import { ILoginInitialValues } from '@/lib/utils/interfaces';

const initialValues: ILoginInitialValues = {
    email: "",
    password: ""
}

const LoginScreen = () => {
    // States
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Hooks
    const { onLogin } = useLogin()

    // Handlers
    const onLoginHandler = async (creds: ILoginInitialValues) => {
        // TODO: Implement login logic
        try {
            await onLogin(creds.username, creds.password)
        }
        catch (err) {
            console.log("SOmething went wrong")
        }



    }

    return (
        <KeyboardAvoidingView
            className='flex-1 bg-white'
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <SafeAreaView className="">
                <Formik initialValues={initialValues} validationSchema={SignInSchema} onSubmit={onLoginHandler}>


                    {
                        ({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }) => {

                            return <View className="mt-24 p-5 items-start gap-y-2">
                                {/* Icon */}
                                <Icon name="envelope" size={30} color="#000" />

                                {/* Title */}
                                <Text className="text-center text-xl font-semibold  text-black">
                                    Enter Your Credentials to login
                                </Text>
                                <Text className="text-center text-sm text-gray-500 mb-5">
                                    We'll check if you have an account
                                </Text>

                                {/* Email Input */}

                                <View className="flex-row items-center border border-gray-300 rounded-lg px-3 bg-white mb-[-4]">
                                    <TextInput
                                        className="flex-1 h-12 text-base text-black"
                                        placeholder="Email"
                                        keyboardType="email-address"
                                        value={values.username}
                                        onChangeText={handleChange('username')}
                                        onBlur={handleBlur('username')}
                                    />
                                </View>
                                {errors.username && (
                                    <Text className='mb-2 text-sm text-red-500'>{errors?.username}</Text>
                                )}

                                {/* Password Input */}
                                <View className="flex-row items-center border border-gray-300 rounded-lg px-3 bg-white mb-[-4]">
                                    <TextInput
                                        className="flex-1 h-12 text-base text-black"
                                        placeholder="Password"
                                        secureTextEntry={!passwordVisible}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}

                                    />
                                    <TouchableOpacity
                                        onPress={() => setPasswordVisible(!passwordVisible)}
                                        className="ml-2"
                                    >
                                        <Icon
                                            name={passwordVisible ? 'eye-slash' : 'eye'}
                                            size={14}
                                            color="#000"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {errors.password && (
                                    <Text className='mb-2 text-sm text-red-500'>{errors?.password}</Text>
                                )}

                                {/* Login Button */}
                                <TouchableOpacity className="h-12 bg-green-500 rounded-3xl py-3 mt-2 w-full" onPress={() => handleSubmit()}>
                                    {isSubmitting ? <SpinnerComponent /> : <Text className="text-center text-white text-lg font-medium">
                                        Login
                                    </Text>}
                                </TouchableOpacity>
                            </View>
                        }
                    }

                </Formik>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
