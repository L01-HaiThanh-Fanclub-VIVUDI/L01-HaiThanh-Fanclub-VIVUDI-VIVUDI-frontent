import { Ionicons } from "@expo/vector-icons";

export type IconName = keyof typeof Ionicons.glyphMap;
export interface InfoRowProps {
    iconName: IconName;
    text: string;
    color: string;
    showArrow: boolean;
    isAddress?: boolean;
    isHours?: boolean;
}
export type Tab = 'overview' | 'review' | 'photos' | 'about';