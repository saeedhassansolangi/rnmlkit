/**
 * Created by Dima Portenko on 05.07.2021
 */
import React, {useEffect, useState} from 'react';
import {Image, useWindowDimensions, ScrollView, Text, Alert} from 'react-native';
import {
  ProcessImageNavigationProps,
  ProcessImageRouteProps,
} from '../navigation/Navigator';
import {recognizeImage, Response} from '../mlkit';
import {ResponseRenderer} from '../components/ResponseRenderer';

interface ProcessImageScreenProps {
  navigation: ProcessImageNavigationProps;
  route: ProcessImageRouteProps;
}

export const ProcessImageScreen = ({route}: ProcessImageScreenProps) => {
  const {width: windowWidth} = useWindowDimensions();
  const [aspectRatio, setAspectRation] = useState(1);
  const [response, setResposne] = useState<Response | undefined>(undefined);
  const uri = route.params.uri;
  const [name, setName] = useState('')
  const [nameRect, setNameRect] = useState(null)

  useEffect(() => {
    if (uri) {
      proccessImage(uri);
    }
  }, [uri]);

  const proccessImage = async (url: string) => {
    if (url) {
      try {
        const response = await recognizeImage(url);

        if(response.blocks.length > 0) {
          const nameIndex = response.blocks.findIndex((block) =>{
            return block.text.includes("Name")
        })

        if(nameIndex < 0) {
         Alert.alert('Name not found') 
        }

        // console.log(response.blocks[nameIndex].text);
        setName(response.blocks[nameIndex].text)

        // @ts-ignore
        setNameRect(response.blocks[nameIndex])
        
        
      }
        
        
        if (response?.blocks?.length > 0) {
          setResposne(response);
          setAspectRation(response.height / response.width);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <Image
        source={{uri}}
        style={{width: windowWidth, height: windowWidth * aspectRatio}}
        resizeMode="cover"
      />
      {!!response && (
        <ResponseRenderer
          response={response}
          scale={windowWidth / response.width}
        />
      )}

      <Text>{name}</Text>

     {
      nameRect  ?  <Text>{JSON.stringify(nameRect, null, 2)}</Text> : null
     }
    </ScrollView>

  );
};
