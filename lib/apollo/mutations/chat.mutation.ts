export const sendChatMessage = `#graphql 
mutation SendChatMessage($orderId: ID!, $messageInput: ChatMessageInput!) {
    sendChatMessage(message: $messageInput, orderId: $orderId) {
      success
      message
      data {
        id
        message
        user {
          id
          name
        }
        createdAt
      }
    }
  }
  `;
