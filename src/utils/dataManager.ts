import botConfigJson from '../../botConfig/botConfig.json'

export const readData = () => {
    Object.entries(botConfigJson).forEach(([key, value]) => {
    console.log(`User key: ${key}, ID: ${value.id}`);
  });
}
