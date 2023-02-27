import { StyleSheet, Text, View } from "react-native";
import { convertDateToString } from "../helper";
import { FullTournamentDetails } from "../types";
import { MainText } from "../Shared/ThemedText";

function DetailSection(props: FullTournamentDetails) {
    if (Object.keys(props).length === 0) {
        return null;
    }

    const startDate = convertDateToString(props.startAt);
    const lastDateRegister = convertDateToString(props.eventRegistrationClosesAt);

    return (
        <View style={styles.container}>
            <View>
                <MainText>City: {props.city}</MainText>
                <MainText>Starting At: {startDate}</MainText>
                <MainText>Country: {props.countryCode}</MainText>
                <MainText>Currency: {props.currency}</MainText>
                {props.eventRegistrationClosesAt && <MainText>Last date for registration: {lastDateRegister}</MainText>}
                <MainText>Number of attendees: {props.numAttendees}</MainText>
                <MainText>Venue Address: {props.venueAddress}</MainText>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default DetailSection;
