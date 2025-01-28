export const chat = `#graphql
query Chat($order: ID!) {
  chat(order: $order) {
    id
    message
    user {
      id
      name
    }
    createdAt
  }
}`;
