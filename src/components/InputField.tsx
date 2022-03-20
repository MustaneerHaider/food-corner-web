import { FC, InputHTMLAttributes } from 'react';
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Textarea
} from '@chakra-ui/react';
import { useField } from 'formik';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	name: string;
	required: boolean;
	textarea?: boolean;
}

const InputField: FC<Props> = ({
	label,
	size: _,
	required,
	textarea,
	...props
}) => {
	const [field, { touched, error }] = useField(props);

	const hasError = touched && !!error;

	return (
		<div className='mb-4'>
			<FormControl isRequired={required} isInvalid={hasError}>
				<FormLabel htmlFor={field.name}>{label}</FormLabel>
				{!textarea ? (
					<Input id={field.name} {...field} {...props} />
				) : (
					<Textarea id={field.name} {...field} rows={5} />
				)}
				{hasError ? <FormErrorMessage>{error}</FormErrorMessage> : null}
			</FormControl>
		</div>
	);
};

export default InputField;
