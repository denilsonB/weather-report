import { Text } from '@chakra-ui/react'

type textTitleProps = {
  title: string
}

export default function TextTitle({title}:textTitleProps){
  return (
    <>
      <Text fontSize='5xl'>{title}</Text>
    </>
  )
}