// Interfaces
import {
  IStoreByIdResponse,
  IStoreCurrentWithdrawRequestResponse,
  IStoreEarningsResponse,
  IStoreTransaction,
  IStoreTransactionHistoryResponse,
} from "@/lib/utils/interfaces/rider.interface";
import { ILazyQueryResult } from "@/lib/utils/interfaces";

// Components
import {
  CustomContinueButton,
  NoRecordFound,
} from "@/lib/ui/useable-components";
import { FlashMessageComponent } from "@/lib/ui/useable-components";
import WithdrawModal from "../form";
import RecentTransaction from "../recent-transactions";

// Hooks
import { useEffect, useState } from "react";
import { useLazyQueryQL } from "@/lib/hooks/useLazyQueryQL";
import { useMutation } from "@apollo/client";
import { useUserContext } from "@/lib/context/global/user.context";

// GraphQL
import { CREATE_WITHDRAW_REQUEST } from "@/lib/apollo/mutations/withdraw-request.mutation";
import {
  STORE_BY_ID,
  STORE_CURRENT_WITHDRAW_REQUEST,
  STORE_EARNINGS,
  STORE_TRANSACTIONS_HISTORY,
} from "@/lib/apollo/queries";
import { GraphQLError } from "graphql";

// Expo
import { router } from "expo-router";

// Core
import { Alert, ScrollView } from "react-native";
import { Text, View } from "react-native";

// Skeletons
import { WalletScreenMainLoading } from "@/lib/ui/skeletons";
import { useTranslation } from "react-i18next";

export default function WalletMain() {
  // Hooks
  const { t } = useTranslation();

  // States
  const [isBottomModalOpen, setIsBottomModalOpen] = useState(false);
  const [amountErrMsg, setAmountErrMsg] = useState("");
  const { userId } = useUserContext();

  // Queries
  const { fetch: fetchStoreEarnings, loading: isStoreEarningsLoading } =
    useLazyQueryQL(STORE_EARNINGS) as ILazyQueryResult<
      IStoreEarningsResponse | undefined,
      { userType: "STORE"; userId: string }
    >;

  const {
    data: storeTransactionData,
    fetch: fetchStoreTransactions,
    loading: isStoreTransactionLoading,
  } = useLazyQueryQL(
    STORE_TRANSACTIONS_HISTORY,
    {
      fetchPolicy: "network-only",
    },
    {
      userType: "STORE",
      userId: userId,
    },
  ) as ILazyQueryResult<
    IStoreTransactionHistoryResponse | undefined,
    {
      userType: string;
      userId: string;
    }
  >;
  const {
    data: storeProfileData,
    fetch: fetchStoreProfile,
    loading: isStoreProfileLoading,
  } = useLazyQueryQL(
    STORE_BY_ID,
    { fetchPolicy: "network-only" },
    {
      id: userId,
    },
  ) as ILazyQueryResult<IStoreByIdResponse | undefined, { id: string }>;

  const {
    data: storeCurrentWithdrawRequestData,
    fetch: fetchStoreCurrentWithdrawRequest,
    loading: isStoreCurrentWithdrawRequestLoading,
  } = useLazyQueryQL(
    STORE_CURRENT_WITHDRAW_REQUEST,
    { fetchPolicy: "network-only" },
    { storeId: userId },
  ) as ILazyQueryResult<
    IStoreCurrentWithdrawRequestResponse | undefined,
    {
      storeId: string;
    }
  >;
  console.warn(
    JSON.stringify({
      storeTransactionData,
      storeCurrentWithdrawRequestData,
      storeProfileData,
    }),
  );
  // Mutaions
  const [createWithDrawRequest, { loading: createWithDrawRequestLoading }] =
    useMutation(CREATE_WITHDRAW_REQUEST, {
      onCompleted: () => {
        FlashMessageComponent({
          message: "Successfully created the withdraw request!",
        });
        setIsBottomModalOpen(false);
        // setIsModalVisible(true)
        router.push({
          pathname: "/(protected)/(tabs)/wallet/(routes)/success",
        });
      },
      onError: (error) => {
        Alert.alert("Warning", error.message, [
          {
            onPress: () => setIsBottomModalOpen(false),
            text: "Okay",
          },
        ]);
        FlashMessageComponent({
          message:
            error.message ||
            error.graphQLErrors[0].message ||
            JSON.stringify(error) ||
            "Something went wrong",
        });
      },
      refetchQueries: [
        {
          query: STORE_BY_ID,
          variables: { id: userId },
          fetchPolicy: "network-only",
        },
        {
          query: STORE_EARNINGS,
          variables: { id: userId },
          fetchPolicy: "network-only",
        },
      ],
    });

  // Handlers
  async function handleFormSubmission(withdrawAmount: number) {
    const currentAmount =
      storeProfileData?.restaurant?.currentWalletAmount || 0;
    if (withdrawAmount > (currentAmount || 0)) {
      return setAmountErrMsg(
        `Please enter a valid amount. You have $${currentAmount} available.`,
      );
    } else if (withdrawAmount < 10) {
      return setAmountErrMsg(
        "The withdraw amount must be atleast 10 or greater.",
      );
    } else if (typeof withdrawAmount !== "number") {
      return setAmountErrMsg("Please enter a valid number.");
    }
    try {
      await createWithDrawRequest({
        variables: {
          requestAmount: withdrawAmount,
        },
      });
    } catch (error) {
      const err = error as GraphQLError;
      console.log(error);
      FlashMessageComponent({
        message: err.message || JSON.stringify(error) || "Something went wrong",
      });
    }
  }
  // Loading state
  const isLoading =
    createWithDrawRequestLoading ||
    isStoreEarningsLoading ||
    isStoreProfileLoading ||
    isStoreTransactionLoading ||
    isStoreCurrentWithdrawRequestLoading;

  // UseEffects
  useEffect(() => {
    if (userId) {
      fetchStoreProfile({
        id: userId,
      });
      fetchStoreEarnings({
        userType: "STORE",
        userId: userId,
      });
      fetchStoreTransactions({
        userType: "STORE",
        userId: userId,
      });
      fetchStoreCurrentWithdrawRequest({
        storeId: userId,
      });
    }
  }, [userId]);
  console.warn({
    cAmount: storeProfileData?.restaurant?.currentWalletAmount,
    isLoading,
    tData: storeTransactionData?.transactionHistory?.data,
  });
  if (isLoading) return <WalletScreenMainLoading />;
  else
    return (
      <View className="flex flex-col justify-between  w-[100%] h-[100%]">
        {!isLoading &&
        (storeProfileData?.restaurant?.currentWalletAmount !== null ||
          undefined) ? (
          <View className="flex flex-column gap-4 items-center bg-[#F3F4F6]">
            <Text className="text-[18px] text-[#4B5563] font-[600] mt-12">
              {t("Current Balance")}
            </Text>
            <Text className="font-semibold text-[32px]">
              $
              {String(
                storeProfileData?.restaurant?.currentWalletAmount ?? "$0",
              )}
            </Text>
            <CustomContinueButton
              title={t("Withdraw Now")}
              onPress={() => setIsBottomModalOpen((prev) => !prev)}
            />
          </View>
        ) : (
          <NoRecordFound msg="Your wallet is currently empty" />
        )}
        {storeCurrentWithdrawRequestData?.storeCurrentWithdrawRequest
          ?.requestAmount !== 0 &&
          storeCurrentWithdrawRequestData?.storeCurrentWithdrawRequest && (
            <View className="w-full h-full">
              <Text className="font-bold text-lg bg-white p-5 mt-4">
                {t("Pending Request")}
              </Text>
              <RecentTransaction
                transaction={{
                  amountTransferred:
                    storeCurrentWithdrawRequestData?.storeCurrentWithdrawRequest
                      ?.requestAmount || 0,
                  status:
                    storeCurrentWithdrawRequestData?.storeCurrentWithdrawRequest
                      ?.status,
                  createdAt:
                    storeCurrentWithdrawRequestData?.storeCurrentWithdrawRequest
                      ?.createdAt,
                }}
                key={
                  storeCurrentWithdrawRequestData?.storeCurrentWithdrawRequest
                    ?.createdAt
                }
                isLast={false}
              />
            </View>
          )}
        <View>
          <Text className="font-bold text-lg bg-white p-5 mt-4">
            {t("Recent Transactions")}
          </Text>

          <ScrollView>
            {storeTransactionData?.transactionHistory?.data.length === 0 &&
            !isLoading ? (
              <NoRecordFound />
            ) : (
              storeTransactionData?.transactionHistory.data.map(
                (transaction: IStoreTransaction, index: number) => {
                  console.warn("🚀 ~ WalletMain ~ transaction:", {
                    transaction,
                  });
                  return (
                    <RecentTransaction
                      transaction={transaction}
                      key={transaction.createdAt}
                      isLast={
                        storeTransactionData?.transactionHistory.data.length -
                          1 ===
                        index
                      }
                    />
                  );
                },
              )
            )}
          </ScrollView>
        </View>
        <WithdrawModal
          isBottomModalOpen={isBottomModalOpen}
          setIsBottomModalOpen={setIsBottomModalOpen}
          amountErrMsg={amountErrMsg}
          setAmountErrMsg={setAmountErrMsg}
          currentTotal={storeProfileData?.restaurant?.currentWalletAmount ?? 0}
          handleFormSubmission={handleFormSubmission}
          withdrawRequestLoading={createWithDrawRequestLoading}
        />
      </View>
    );
}
