import { StyleSheet, View, Text } from "react-native"
import { useTheme } from "@react-navigation/native"

import { ImageType } from "../types";
import PlaceholderImage from "../Shared/PlaceholderImage";
import { Standing, User } from "./types"; 
import { getNumberOrdinal } from "../helper";

function getImages(participants: {user: User}[]): string[] {
    const images = participants.map((participant) => {
        const user = participant.user;
        const image = user.images[0];
        return image ? image.url : '';
    });

    return images;
}



const ResultCard = ({playerData, index}: {playerData: Standing, index: number}) => {

    const { colors } = useTheme();
    const placement = playerData.placement;
    const placementString = getNumberOrdinal(placement);
    // console.log(placementString);

    const containerStyle = {
        ...styles.container,
        borderColor: colors.border,
        backgroundColor: colors.card,
        marginTop: index === 0 ? 10 : undefined
    }

    // If the event is singles
    if (playerData.player) {
        const player = playerData.player;
        const user = player.user;
        const image = user.images[0];
        const profileImage = image ? image.url : '';        
    
        return (
            <View style={containerStyle}>
                <View style={styles.imageContainer}>
                    <PlaceholderImage imageSrc={profileImage} placeholder='player' style={styles.image} />
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.playerTitle}>
                        <Text style={{...styles.playerTag, color: colors.text}}>{player.gamerTag}</Text>
                        { player.prefix && <Text style={{...styles.playerSponsor, color: colors.secondaryText}}>{player.prefix}</Text> }
                        { user.genderPronoun && <Text style={{...styles.playerPronoun, color: colors.secondaryText}}>{user.genderPronoun}</Text>}
                    </View>
                    <Text style={{...styles.playerPlacement, color: colors.text}}>{placementString}</Text>
                </View>
            </View>
        )
    }

    // Teams (not singles) events
    const entrant = playerData.entrant;
    const participants = entrant.participants;
    const images = getImages(participants);
    
    return (
        <View style={containerStyle}>
            <View style={styles.imageContainer}>
                <PlaceholderImage imageSrc={images[0]} placeholder="player" style={styles.image}/>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.playerTitle}>
                    <Text style={{...styles.playerTag, color: colors.text}}>{entrant.name}</Text>
                </View>
                <Text style={{...styles.playerPlacement, color: colors.text}}>{placementString}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        borderWidth: 1,
        borderStyle: 'solid'
    },
    imageContainer: {
        height: 100,
        width: 100,
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    detailsContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    playerTitle: {
        marginLeft: 5
    },
    playerTag: {
        fontWeight: 'bold',
        fontSize: 18,
        flexWrap: 'wrap',
        flexShrink: 1
    },
    playerSponsor: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    playerPronoun: {
        fontSize: 15
    },
    playerPlacement: {
        marginLeft: 'auto',
        marginRight: 20,
        fontWeight: '700',
        fontSize: 20
    }
});

export default ResultCard;
