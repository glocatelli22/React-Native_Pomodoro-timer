import { StyleSheet, View, Text } from "react-native";
import ActionButton from "../ui/ActionButton";
import Input from "../ui/Input";
import StatusPicker from "../ui/StatusPicker";
import { FormState, InputType, Status, Task } from "../../types";
import { Fragment } from "react";
import { COLORS } from "../../utils/colors";
import { useForm } from "../../hooks/form";

interface FormProps {
    submitHandler: (formState: FormState) => void,
    markAsActiveHandler: () => void,
    deleteHandler: () => void,
    taskData?: Task,
    isEdit: boolean,
    isActiveTask: boolean
};

const TaskForm = ({
        submitHandler,
        markAsActiveHandler,
        deleteHandler,
        taskData,
        isEdit,
        isActiveTask
    } : FormProps ) => {

    const defaultTile = taskData?.title || '';
    const defaultDescription = taskData?.description || '';
    const defaultDuration = taskData?.duration?.toString() || '';
    const defaultStatus = taskData?.status || Status.open;

    const [formState, handleInputChange] = useForm<FormState, string | Status>({
        title: defaultTile,
        description: defaultDescription,
        duration: defaultDuration,
        status: defaultStatus
    });
  
    const isFormValid = formState.title.trim() !== "" && parseInt(formState.duration) > 0;

    return (
        <View>
            <View style={styles.form}>
                <Input 
                    label="Title*" 
                    value={formState.title} 
                    onChangeHandler={handleInputChange.bind(this, 'title')}
                    isValid={formState.title ? formState.title.trim() != "" : true }
                    validationMsg="Please enter valid title"/>
                <Input 
                    label="Description" 
                    value={formState.description} 
                    onChangeHandler={handleInputChange.bind(this, 'description')}
                    additionalStyle={{ textAlignVertical: 'top', minHeight: 100 }}
                    settings={{ multiline: true, numberOfLines: 5 }} />
                <View style={styles.formRow}>
                    <View style={styles.formCol}>
                        <Input 
                            label="Pomodoro*" 
                            value={formState.duration} 
                            settings={{ keyboardType: 'number-pad', maxLength: 2 }}
                            onChangeHandler={handleInputChange.bind(this, 'duration')} 
                            additionalStyle={styles.durationInput} 
                            isValid={formState.duration ? parseInt(formState.duration) > 0 : true}
                            validationMsg="Value should be > 0"/>
                    </View>
                    {isEdit && 
                        <View style={[styles.formCol, { flexGrow: 1 }]}>
                            <StatusPicker 
                                defaultValue={defaultStatus} 
                                onChangeHandler={handleInputChange.bind(this, 'status')}/>
                        </View>
                    }
                </View>
                <Text style={{ color: COLORS.textColor }}>* required fields</Text>
            </View>
            <View>
                <View style={styles.buttonWrapper}>
                    <ActionButton 
                        disabled={!isFormValid}
                        onPress={() => submitHandler(formState)}>
                        Save 
                    </ActionButton>
                </View>
                {isEdit &&  
                    <Fragment>
                        {!isActiveTask &&  
                            <View style={styles.buttonWrapper}>
                                <ActionButton onPress={markAsActiveHandler} type="secondary">
                                    Mark as active
                                </ActionButton>
                            </View>
                        }
                        <View style={styles.buttonWrapper}>
                            <ActionButton onPress={deleteHandler} type="delete">
                                Delete 
                            </ActionButton>
                        </View>
                    </Fragment>
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    form: {
        marginBottom: 20
    },
    formRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: -8
    },
    formCol: {
        flexBasis: 100,
        marginHorizontal: 8
    },
    durationInput: { 
        width: 100,
        textAlign: 'center',
        color: COLORS.primary 
    },
    buttonWrapper: {
       marginBottom: 12
    }
});

export default TaskForm;