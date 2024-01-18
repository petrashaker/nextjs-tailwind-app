'use client'

import TrainingForm from "../TrainingForm/TrainingForm";

const HomeWrapper = (props: { lng: string }) => {
  return <TrainingForm lng={props.lng} />
}

export default HomeWrapper;
