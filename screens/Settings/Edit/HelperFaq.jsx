import { View, Text, SafeAreaView, Platform, StatusBar, FlatList } from 'react-native'
import React from 'react'
import { AppBar, HeightSpacer } from '../../../components';
import general from "../../../components/general.style";
import { COLORS, SIZES } from '../../../constants/theme';
import { List } from 'react-native-paper';
import styles from '../settings.style.js';

const HelperFaq = ({ navigation }) => {
  const faqs = [
    {
      question: "Planwire uygulaması nasıl çalışır?",
      answer:
        "Planwire, inşaat projelerinde sorun bildirme ve taleplerin yönetilmesi için geliştirilmiş bir mobil uygulamadır. Kullanıcılar, projeler üzerinde pin bırakabilir, çizim yapabilir, belgeleri imzalayıp saklayabilir ve ekip üyeleriyle iletişim kurabilir.",
    },
    {
      question: "Planwire'da hangi özellikler mevcut?",
      answer:
        "Planwire, sorun bildirimi, anında mesajlaşma, belge yönetimi, ve ekip yönetimi gibi bir dizi özellik sunar. Ayrıca, projeler üzerinde işaretleme yapabilir ve sorunları doğrudan projeye ekleyebilirsiniz.",
    },
    {
      question: "Planwire'ı hangi cihazlarda kullanabilirim?",
      answer:
        "Planwire, Android ve iOS platformlarında kullanılabilir. Uygulama ayrıca web üzerinden de erişilebilir.",
    },
    {
      question: "Planwire ile ilgili nasıl destek alabilirim?",
      answer:
        "Planwire uygulamasıyla ilgili sorunlarınızı uygulama içi destek bölümünden, web formu üzerinden veya destek e-postasıyla iletebilirsiniz.",
    },
    {
      question: "Planwire uygulamasını kullanırken verilerim güvende mi?",
      answer:
        "Evet, Planwire uygulaması kullanıcı verilerini korumak için en güncel güvenlik protokollerini kullanır. Tüm verileriniz şifrelenmiş olarak saklanır.",
    },
    {
      question:
        "Planwire uygulamasını kullanmak için internet bağlantısı gerekli mi?",
      answer:
        "Evet, Planwire uygulaması bulut tabanlı bir uygulama olduğundan, tüm işlevsellikler için aktif bir internet bağlantısı gereklidir.",
    },
  ];


  return (
    <SafeAreaView
      style={[
        general.container,
        { paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight },
      ]}
    >
      {/* Header */}
      <View style={general.page}>
        <AppBar
          top={20}
          left={20}
          right={20}
          color={COLORS.white}
          title={"Sıkça Sorulan Sorular"}
          onPress={() => navigation.goBack()}
        />
        <HeightSpacer height={75} />
        <FlatList
          style={{ height: SIZES.height / 2.5 }}
          data={faqs}
          vertical
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <List.Accordion
              titleNumberOfLines={null}
              titleEllipsizeMode="tail"
              rippleColor="transparent"
              theme={{ colors: { primary: "black" } }}
              titleStyle={{ fontFamily: "medium", fontSize: SIZES.small }}
              title={item.question}
              style={styles.listItem}
            >
              <List.Item
                titleNumberOfLines={null}
                titleEllipsizeMode="tail"
                title={item.answer}
                style={styles.listItem}
              />
            </List.Accordion>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HelperFaq