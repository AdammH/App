import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/colors";
import ProgressBar from "./UI/ProgressBar";
import { SvgXml } from "react-native-svg";
import PrivateEventIcon from "../assets/private-event.svg";
import PublicEventIcon from "../assets/public-event.svg";
import ProfileUsersIcon from "../assets/profile-user-icon.svg";
import LocationIcon from "../assets/location-icon.svg";
import BlueAttendeeIcon from "../assets/blue-attendee.svg";
import GreenAttendeeIcon from "../assets/green-attendee.svg";
import RedAttendeeIcon from "../assets/red-attendee.svg";
import SecondaryButton from "./UI/buttons/SecondaryButton";

function EventItem({ type, status, attendanceNumber, mapNavigation, onPress, eventDate, partyHopButton }) {
    const attendeeIcons = [BlueAttendeeIcon, GreenAttendeeIcon, RedAttendeeIcon];
    let loop = 0;
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.light_item_grad_green, Colors.dark_item_grad_green]}
                start={[0, 0]}
                style={[styles.inner_container, mapNavigation ? { width: "97%" } : { width: "100%" }]}
            >
                <View style={styles.type_icon_container}>
                    <LinearGradient
                        colors={[Colors.light_item_type_stroke_grad_green, Colors.dark_item_type_stroke_grad_green]}
                        start={[0, 0]}
                        style={styles.type_stroke_icon}
                    />
                    <LinearGradient colors={[Colors.light_item_type_grad_green, Colors.dark_item_type_grad_green]} start={[0, 0]} style={styles.type_icon}>
                        {type.includes("Fun") && <Image source={require("../assets/type/fun.png")} style={styles.image} />}
                        {type.includes("Sport") && <Image source={require("../assets/type/sport.png")} style={styles.image} />}
                        {type.includes("Tech") && <Image source={require("../assets/type/photo.png")} style={styles.image} />}
                        {type.includes("Party") && <Image source={require("../assets/type/fun.png")} style={styles.image} />}
                        {type.includes("Social") && <Image source={require("../assets/type/social_huge_party.png")} style={styles.image} />}
                    </LinearGradient>
                </View>
                <View style={styles.info_container}>
                    <View style={styles.info_row_container}>
                        {status === "P" && <SvgXml xml={PrivateEventIcon} />}
                        {status === "D" && <SvgXml xml={PublicEventIcon} />}

                        <Text style={styles.info_text}>{type}</Text>
                    </View>
                    <View style={styles.info_row_container}>
                        <Text style={[styles.progress_text, {fontFamily: 'poppins-semi-bold'}]}>{eventDate ? `${eventDate[0]}, ${eventDate[1]}` : "25%"}</Text>
                        {!eventDate && <ProgressBar progress={25} bgColor={Colors.progress_dark_bg} />}
                    </View>
                    <View style={styles.info_row_container}>
                        {eventDate ? (
                            <Text style={[styles.progress_text, {marginLeft: -3}]}>{eventDate[2]}</Text>
                        ) : (
                            <>
                                <View style={styles.dot} />
                                <Text style={styles.status_text}>Ongoing</Text>
                            </>
                        )}
                    </View>
                </View>
                <View style={styles.right_container}>
                    <View style={[styles.party_attendance, {zIndex:1}]}>
                        <View style={{ flexDirection: "row" }}>
                            {attendeeIcons.map((icon) => {
                                loop++;

                                if (loop <= attendanceNumber) {
                                    return (
                                        <SvgXml
                                            xml={icon}
                                            style={[styles.attendeeIconsRow, { right: -22 + loop * 15, zIndex: -1 * loop }]}
                                            key={Math.random()}
                                        />
                                    );
                                }
                            })}
                        </View>
                        <View style={[styles.party_number, {zIndex: 4}]}>
                            <Text style={styles.attendance_text}>{attendanceNumber}</Text>
                            <SvgXml xml={ProfileUsersIcon} />
                        </View>
                    </View>
                    <SecondaryButton text="Party Hop" onPress={partyHopButton}/>
                </View>
            </LinearGradient>
            {mapNavigation && (
                <TouchableOpacity style={styles.map_container} onPress={onPress && onPress}>
                    <LinearGradient style={styles.map_container} colors={[Colors.dark_green, Colors.light_green]} start={[0, 0]}>
                        <SvgXml xml={LocationIcon} />
                    </LinearGradient>
                </TouchableOpacity>
            )}
        </View>
    );
}

export default EventItem;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        marginBottom: 16,
        paddingHorizontal: 10,
        justifyContent: "center",
        marginHorizontal: 10,
        alignSelf: 'center'
    },
    inner_container: {
        flexDirection: "row",
        height: "100%",
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 12,
    },
    type_icon_container: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        
    },
    type_icon: {
        width: 77,
        height: 77,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    type_stroke_icon: {
        position: "absolute",
        width: 79,
        height: 79,
        borderRadius: 24,
    },
    image: {
        width: 33,
        height: 33,
        objectFit: 'contain'
    },
    info_container: {
        flex: 1,
        marginLeft: 16,
        height: 60,
        width: 93
    },
    info_text: {
        fontSize: 16,
        color: Colors.grey_text_color,
        fontFamily: "poppins-semi-bold",
    },
    info_row_container: {
        flexDirection: "row",
        columnGap: 4,
        alignItems: "center",
    },
    progress_text: {
        color: Colors.progress_text,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.light_green,
    },
    status_text: {
        color: Colors.grey_text_color,
        fontFamily: "poppins-regular",
        fontSize: 10,
    },
    right_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        rowGap: 8,
        marginRight: 12,
    },
    party_attendance: {
        width: 76,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    party_number: {
        width: 32,
        height: 32,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.stroke_number_container,
        backgroundColor: Colors.bg_number_container,
        right: 0,
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        overflow: "hidden",
    },
    attendance_text: {
        color: Colors.progress_text,
        fontFamily: "poppins-regular",
        fontSize: 10,
        marginTop: 8,
    },
    map_container: {
        width: 36,
        height: 36,
        borderRadius: 13,
        position: "absolute",
        right: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    attendeeIconsRow: {
        position: "absolute",
        width: 32,
        height: 32,
        marginTop: 2,
    },
});
