export const rider = `#graphql
query Rider($id:String){
  rider(id:$id){
    _id
    location {coordinates}
  }
}`;
