import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1.5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 18,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  socialIcon: {
    fontSize: 24,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#444',
    opacity: 0.3,
  },
  orText: {
    marginHorizontal: 8,
    fontSize: 16
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 2,
    marginTop: 8,
  },
  input: {
    borderWidth: 1.2,
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
    fontSize: 15,
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    color: '#E94F37',
    marginTop: 4,
    marginBottom: 4,
    textAlign: 'center',
  },
});