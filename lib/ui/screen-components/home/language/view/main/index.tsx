// Constants
import {
  CustomContinueButton,
  CustomRadioButton,
} from '@/lib/ui/useable-components'
import { LANGUAGES } from '@/lib/utils/constants'
import { changeLanguage } from 'i18next'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

// Core
import { Image, Text, View } from 'react-native'

export default function LanguageMain() {
  // States
  const [isSelected, setIsSelected] = useState('')
  
  // Hooks
  const { t } = useTranslation()

  return (
    <View className="h-[85%] w-[90%] items-center justify-between mx-auto  p-4">
      {LANGUAGES.map((lng, index) => {
        return (
          <View
            key={`lng-${index}`}
            className="w-full mx-auto flex flex-row items-center justify-between border-b-2 border-b-gray-300 h-12"
          >
            <View className="flex flex-row gap-3 items-center justify-center px-3">
              <View className="overflow-hidden items-center justify-start w-8 h-6">
                <Image
                  source={lng.icon}
                  width={100}
                  height={100}
                  className="max-w-8 max-h-8"
                />
              </View>
              <Text>{lng.value}</Text>
            </View>
            <View>
              <CustomRadioButton
                label={lng.code}
                isSelected={lng.code === isSelected}
                showLabel={false}
                onPress={() => {
                  setIsSelected(lng.code)
                }}
              />
            </View>
          </View>
        )
      })}
      <View>
        <CustomContinueButton
          title={t('Update Language')}
          onPress={() => {
            changeLanguage(isSelected)
          }}
        />
      </View>
    </View>
  )
}
