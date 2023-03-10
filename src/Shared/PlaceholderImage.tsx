import { PlaceholderGame, PlaceHolderPlayer, PlaceholderTournament } from "../Shared/Logos"
import { ImageSourcePropType, Image, StyleSheet, StyleProp, ViewStyle, RegisteredStyle, ImageStyle, ImageURISource } from "react-native"

const PlaceholderImage = ({imageSrc, placeholder='tournament', style}: {imageSrc: string, placeholder?: 'tournament'|'game'|'player', style?: StyleProp<ImageStyle>}) => {
    let placeholderFinal: ImageSourcePropType;

    switch (placeholder) {
        case 'tournament':
            placeholderFinal = PlaceholderTournament;
            break;
        case 'game':
            placeholderFinal = PlaceholderGame;
            break;
        case 'player':
            placeholderFinal = PlaceHolderPlayer;
            break;
    }


    if (imageSrc) {
        return (
            <Image 
                style={[styles.image, style]}
                source={{uri: imageSrc}}
                defaultSource={placeholderFinal as ImageURISource|number}/>
        )
    }

    const image = <Image
                    style={[styles.image, style]}
                    source={placeholderFinal}/>;
    
    return image
}

const styles = StyleSheet.create({
    image: {
        backgroundColor: 'white'
    }
})

export default PlaceholderImage;
