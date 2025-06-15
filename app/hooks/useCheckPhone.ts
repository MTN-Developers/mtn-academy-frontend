import axios, { AxiosError } from 'axios';

export const useCheckPhone = () => {
  let check_phone_is_valid = '';
  let check_phone_status = '';

  const handleCheckPhoneNumber = async ({ phoneNumber }: { phoneNumber: string }) => {
    // const apiKey = process.env.NEXT_PUBLIC_CHECK_PHONE_API_KEY;
    try {
      const { data, status } = await axios.get(`https://api.api-ninjas.com/v1/validatephone?number=${phoneNumber}`, {
        headers: {
          'X-Api-Key': 'shYtnLoN5R3msDDUlAYmrA==n49UbXC0qsEbWOYt',
          // 'X-Api-Key': apiKey,
        },
      });

      check_phone_is_valid = data.is_valid;
      // console.log('is phone number valid? ', check_phone_is_valid);

      check_phone_status = String(status);
      // console.log('is phone number status? ', check_phone_status);
    } catch (e) {
      console.log(e, 'Error');
    }

    const data = {
      phone: phoneNumber,
    };

    let isMessageSent;

    try {
      // const sendWhatsapp = await axios.post('https://managethenow.com/api/api/whatsapp/' as string, data);

      const sendWhatsapp = await axios.get(`https://api.api-ninjas.com/v1/validatephone?number=${data.phone}`, {
        headers: {
          'X-Api-Key': 'shYtnLoN5R3msDDUlAYmrA==n49UbXC0qsEbWOYt',
        },
      });

      if (sendWhatsapp.status == 200) {
        console.log('send whatsapp response', sendWhatsapp.data);
        if (sendWhatsapp.data.is_valid === false) {
          isMessageSent = false;
        } else {
          isMessageSent = true;
        }
      }

      console.log('is message sent', isMessageSent);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err!.response!.status == 400) {
          isMessageSent = false;
        }
      }
    }

    return {
      isPhoneValid: check_phone_is_valid,
      status: check_phone_status,
      isMsgSent: isMessageSent,
    };
  };

  return { handleCheckPhoneNumber };
};
