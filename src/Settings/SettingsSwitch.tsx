import { Switch, Text, View } from "react-native";
import { SettingsProps } from "./types";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { SettingsItemStyles } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MainText } from "../Shared/ThemedText";


const SettingsSwitch = ({ title, setting, style }: SettingsProps) => {

    const [active, setActive] = useState(false);
    const mounted = useRef(false);
    const { colors } = useTheme();

    async function initialSetup() {
        const value = await AsyncStorage.getItem(setting);

        if (value === null) {
            return
        }

        const valueBool = value === "true";

        setActive(valueBool);
        mounted.current = true
    }

    useEffect(() => {
        // Keep state hook and storage in sync
        if (!mounted.current) {
            initialSetup();
        }
        AsyncStorage.setItem(setting, active.toString());
    }, [active])

    function toggleSwitch(state) {
        setActive(state);
    }

    return (
        <View style={[SettingsItemStyles.container, { borderColor: colors.border }, style]}>
            <MainText style={SettingsItemStyles.title}>{title}</MainText>
            <View style={SettingsItemStyles.componentContainer}>
                <Switch value={active} onValueChange={toggleSwitch} />
            </View>

        </View>
    )
}

export default SettingsSwitch;
