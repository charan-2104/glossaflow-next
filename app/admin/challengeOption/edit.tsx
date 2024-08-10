
import { Edit, ReferenceInput, required, SimpleForm, TextInput, SelectInput, BooleanInput } from "react-admin";

export const ChallengeOptionEdit = () => {
    return(
        <Edit>
            <SimpleForm>
                <TextInput source="text" validate={[required()]} label="Question" />
                <BooleanInput source="correct" label="correct option" />
                <ReferenceInput source="challengeId" reference="challenges"/>
                <TextInput source="imageSrc" label="Image Url" />
                <TextInput source="audioSrc" label="Audio Url" />
            </SimpleForm>
        </Edit>
    )
}