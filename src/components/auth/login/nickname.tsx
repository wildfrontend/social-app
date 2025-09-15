import { Text, TextInput } from 'react-native-paper';

export type NickNameFieldProps = {
  onChange: (value: string) => void;
  onSubmit: () => void;
  value: string;
  disabled?: boolean;
  error?: string;
};

const NickNameField: Comp<NickNameFieldProps> = ({
  disabled,
  value,
  error,
  onChange,
  onSubmit,
}) => {
  return (
    <>
      <TextInput
        editable={!disabled}
        mode="outlined"
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        placeholder="輸入暱稱"
        returnKeyType="done"
        style={{ marginTop: 12 }}
        value={value}
      />
      {error && (
        <Text theme={{ colors: { error: 'red' } }} variant="bodySmall">
          {error}
        </Text>
      )}
    </>
  );
};

export default NickNameField;
