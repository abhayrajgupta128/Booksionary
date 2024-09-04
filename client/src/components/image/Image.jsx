
const Image = ({src,...rest}) => {
    src=src && src.includes('https://')?src: 'https://localhost:4000/'+src;
  return (
    <div>
      
    </div>
  )
}

export default Image
