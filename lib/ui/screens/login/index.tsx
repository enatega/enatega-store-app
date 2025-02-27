// Core
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// React Native
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// Components
import SpinnerComponent from "@/lib/ui/useable-components/spinner";
// Icon
import Icon from "react-native-vector-icons/FontAwesome6";
// Schemas
import { SignInSchema } from "@/lib/utils/schema";
// Hook
import useLogin from "@/lib/hooks/useLogin";
// Interface
import { useApptheme } from "@/lib/context/theme.context";
import { ILoginInitialValues } from "@/lib/utils/interfaces";
import { useTranslation } from "react-i18next";

const initial: ILoginInitialValues = {
  username: "",
  password: "",
};

const LoginScreen = () => {
  // States
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(initial);

  // Hooks
  const { appTheme } = useApptheme();
  const { t } = useTranslation();
  const { onLogin, creds, isLogging } = useLogin();

  // Handlers
  const onLoginHandler = async (creds: ILoginInitialValues) => {
    // TODO: Implement login logic
    try {
      await onLogin(creds.username, creds.password);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  const onInit = () => {
    if (!creds?.username) return;
    setInitialValues(creds);
  };

  // Use Effect
  useEffect(() => {
    onInit();
  }, [creds]);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white justify-center"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView
        style={{
          backgroundColor: appTheme.themeBackground,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ height: height * 1 }}
        >
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={SignInSchema}
            onSubmit={onLoginHandler}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
              return (
                <View className="mt-24 p-5 items-start gap-y-2">
                  {/* Icon */}
                  <Icon name="envelope" size={30} color={appTheme.primary} />

                  {/* Title */}
                  <Text
                    className="text-center text-xl font-semibold"
                    style={{ color: appTheme.fontMainColor }}
                  >
                    {t("Enter Your Credentials to login")}
                  </Text>
                  <Text
                    className="text-center text-sm mb-5"
                    style={{ color: appTheme.fontSecondColor }}
                  >
                    {t("We'll check if you have an account")}
                  </Text>

                  {/* Email Input */}

                  <View
                    className="flex-row items-center border rounded-lg px-3 bg-white mb-[-4]"
                    style={{ backgroundColor: appTheme.themeBackground }}
                  >
                    <TextInput
                      className="flex-1 h-12 text-bas"
                      style={{ color: appTheme.fontMainColor }}
                      placeholder={t("Email")}
                      keyboardType="email-address"
                      value={values.username}
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                    />
                  </View>
                  {errors.username && (
                    <Text className="mb-2 text-sm text-red-500">
                      {errors?.username}
                    </Text>
                  )}

                  {/* Password Input */}
                  <View
                    className="flex-row items-center border rounded-lg px-3 bg-white mb-[-4]"
                    style={{ backgroundColor: appTheme.themeBackground }}
                  >
                    <TextInput
                      className="flex-1 h-12 text-base"
                      style={{ color: appTheme.fontMainColor }}
                      placeholder={t("Password")}
                      secureTextEntry={!passwordVisible}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                    />
                    <TouchableOpacity
                      onPress={() => setPasswordVisible(!passwordVisible)}
                      className="ml-2"
                    >
                      <Icon
                        name={passwordVisible ? "eye-slash" : "eye"}
                        size={14}
                        color="#000"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text className="mb-2 text-sm text-red-500">
                      {errors?.password}
                    </Text>
                  )}

                  {/* Login Button */}
                  <TouchableOpacity
                    className="h-12 bg-green-500 rounded-3xl py-3 mt-10 w-full"
                    onPress={() => handleSubmit()}
                  >
                    {isLogging ? (
                      <SpinnerComponent />
                    ) : (
                      <Text
                        className="text-center  text-lg font-medium"
                        style={{ color: appTheme.fontMainColor }}
                      >
                        {t("Login")}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              );
            }}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
