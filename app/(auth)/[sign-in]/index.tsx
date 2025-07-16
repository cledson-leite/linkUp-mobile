import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, useColorScheme, Alert } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/styles/Colors';
// Importe ícones reais, por exemplo:
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TextInput, View } from '@/styles/Themed';
import { styles } from './styles';

export default function SignUpScreen() {
  const colorScheme = useColorScheme() || 'dark';
  const colors = Colors[colorScheme];
  const router = useRouter();

  const { signUp, setActive, isLoaded } = useSignUp();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  // Função para login social
  const handleSocialSignUp = async (provider: 'oauth_google' | 'oauth_github' | 'oauth_linkedin') => {
    if (!isLoaded) return;
    try {
      await signUp.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: 'linkup://',
        redirectUrlComplete: 'linkup://',
      });
    } catch (err: any) {
      Alert.alert('Erro', err.errors?.[0]?.message || 'Erro ao autenticar com rede social');
    }
  };

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setError('');
    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Erro ao criar conta');
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setError('');
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      await setActive({ session: completeSignUp.createdSessionId });
      // Redirecionar para home ou dashboard
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Erro ao verificar código');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background, borderColor: colors.principalBorda }]}>
        <Text style={[styles.title, { color: colors.textoPrincipal }]}>Crie sua conta</Text>
        <Text style={[styles.subtitle, { color: colors.textoSecundario }]}>Bem-vindo! Preencha os dados para começar.</Text>

        {/* Botões sociais */}
        <View style={styles.socialRow}>
          <TouchableOpacity
            style={[
              styles.socialButton,
              { backgroundColor: colorScheme === 'dark' ? colors.background : '#fff', borderColor: colors.principalBorda, borderWidth: 1 }
            ]}
            onPress={() => handleSocialSignUp('oauth_github')}
            accessibilityLabel="Cadastrar com GitHub"
          >
            <FontAwesome name="github" size={24} color="#222" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.socialButton,
              { backgroundColor: colorScheme === 'dark' ? colors.background : '#fff', borderColor: colors.principalBorda, borderWidth: 1 }
            ]}
            onPress={() => handleSocialSignUp('oauth_google')}
            accessibilityLabel="Cadastrar com Google"
          >
            <AntDesign name="google" size={24} color="#EA4335" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.socialButton,
              { backgroundColor: colorScheme === 'dark' ? colors.background : '#fff', borderColor: colors.principalBorda, borderWidth: 1 }
            ]}
            onPress={() => handleSocialSignUp('oauth_linkedin')}
            accessibilityLabel="Cadastrar com LinkedIn"
          >
            <Entypo name="linkedin" size={24} color="#0077B5" />
          </TouchableOpacity>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={[styles.orText, { color: colors.textoSecundario }]}>ou</Text>
          <View style={styles.divider} />
        </View>

        {pendingVerification ? (
          <>
            <Text style={{ color: colors.textoPrincipal, marginBottom: 8 }}>Confira seu e-mail para o código</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.principalBorda, color: colors.textoPrincipal }]}
              placeholder="Código de verificação"
              placeholderTextColor={colors.cinzaClaro}
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
            />
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.principalPreenchimento }]} onPress={onVerifyPress}>
              <Text style={[styles.buttonText, { color: colors.textoPrincipal }]}>Verificar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={[styles.label, { color: colors.textoPrincipal }]}>Nome</Text>
                <TextInput
                  style={[styles.input, { borderColor: colors.principalBorda, color: colors.textoPrincipal }]}
                  placeholder="Nome"
                  placeholderTextColor={colors.cinzaClaro}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, { color: colors.textoPrincipal }]}>Sobrenome</Text>
                <TextInput
                  style={[styles.input, { borderColor: colors.principalBorda, color: colors.textoPrincipal }]}
                  placeholder="Sobrenome"
                  placeholderTextColor={colors.cinzaClaro}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>
            <Text style={[styles.label, { color: colors.textoPrincipal }]}>E-mail</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.principalBorda, color: colors.textoPrincipal }]}
              placeholder="Digite seu e-mail"
              placeholderTextColor={colors.cinzaClaro}
              value={emailAddress}
              onChangeText={setEmailAddress}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Text style={[styles.label, { color: colors.textoPrincipal }]}>Senha</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.principalBorda, color: colors.textoPrincipal }]}
              placeholder="Digite sua senha"
              placeholderTextColor={colors.cinzaClaro}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.principalPreenchimento }]} onPress={onSignUpPress}>
              <Text style={[styles.buttonText, { color: colors.textoPrincipal }]}>Cadastrar</Text>
            </TouchableOpacity>
          </>
        )}
        {/* Link para tela de login */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 18 }}>
          <Text style={{ color: colors.textoSecundario, fontSize: 15 }}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text
              style={{
                color: colors.principalBorda,
                fontSize: 18,
                textDecorationLine: 'none',
                marginLeft: 2,
              }}
            >
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}