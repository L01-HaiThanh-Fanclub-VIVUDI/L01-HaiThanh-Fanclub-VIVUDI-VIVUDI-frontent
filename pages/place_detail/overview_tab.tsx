import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { InfoRowProps } from "./types";

const MAIN_COLOR = '#FF678B';
const OverviewTab = ({ data }: { data: any }) => {
    const InfoRow = ({ iconName, text, color, showArrow, isAddress = false, isHours = false }: InfoRowProps) => (
        <View style={[styles.infoRow, isAddress && styles.addressRow, isHours && styles.hoursRow]}>
            <Ionicons name={iconName} size={24} color={color} style={styles.infoIcon} />
            <View style={styles.infoTextContainer}>
                <Text style={[styles.infoText, { color: color }]}>{text}</Text>
            </View>
            {showArrow && <Ionicons name="chevron-down" size={20} color="#888" />}
        </View>
    );

    return <>
        <InfoRow
            iconName="information-circle-outline"
            text="Hours may be incorrect"
            color={MAIN_COLOR}
            showArrow={true}
        />
        <InfoRow
            iconName="location-outline"
            text={data.address}
            color="#666"
            showArrow={false}
            isAddress={true}
        />

        <InfoRow
            iconName="time-outline"
            text={`Open • Closes ${data.closingTime}`}
            color="#000"
            showArrow={true}
            isHours={true}
        />
    </>;
}

export default OverviewTab;