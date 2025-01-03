import BoxWithCheckbox from "../components/UI/buttons/BoxWithCheckbox";

export function flashListItemFunction({ item, index}){
  return <BoxWithCheckbox strokeStatus={false} text={item} />
}