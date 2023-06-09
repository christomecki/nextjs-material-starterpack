import { Box, Button } from '@mui/material';
import React from 'react';

export const COOKIE_NAME = 'cookies-accepted';
export const COOKIE_CONTENT = `${COOKIE_NAME}=true;max-age=31536000;path=/`;

const locales = {
  it: {
    message:
      'Utilizziamo i cookie per essere sicuri che tu possa avere la migliore esperienza sul nostro sito. Se continui ad utilizzare questo sito assumiamo che tu ne sia felice.',
    accept: 'OK',
  },
  en: {
    message: 'We use cookies to ensure that you have the best experience on our website. If you continue to use this site we assume that you accept this.',
    accept: 'OK',
  },
  fr: {
    message:
      "Nous utilisons des cookies afin d'être sûr que vous pouvez avoir la meilleure expérience sur notre site. Si vous continuez à utiliser ce site, nous supposons que vous acceptez.",
    accept: 'OK',
  },
  pt: {
    message:
      'Utilizamos cookies para garantir que você tenha a melhor experiência em nosso site. Se você continuar a usar este site, assumimos que você aceita isso.',
    accept: 'OK',
  },
  es: {
    message:
      'Utilizamos cookies para asegurarnos de que usted tenga la mejor experiencia en nuestro sitio web. Si continúa usando este sitio, asumimos que lo acepta.',
    accept: 'OK',
  },
  nl: {
    message:
      'We gebruiken cookies om ervoor te zorgen dat u de beste ervaring heeft op onze website. Als u deze site blijft gebruiken, gaan we ervan uit dat u dit accepteert.',
    accept: 'OK',
  },
  pl: {
    message:
      'Używamy plików cookie w celu zapewnienia najlepszych doświadczeń na naszej stronie internetowej. Jeśli będziesz nadal korzystać z tej strony, zakładamy, że to akceptujesz.',
    accept: 'Akceptuję',
  },
  de: {
    message:
      'Wir verwenden Cookies, um sicherzustellen, dass Sie die beste Erfahrung auf unserer Website machen können. Wenn Sie diese Website weiterhin nutzen, gehen wir davon aus, dass Sie dies akzeptieren.',
    accept: 'OK',
  },
};

type SupportedLocales = keyof typeof locales;

const isSupportedLocale = (locale?: string): locale is SupportedLocales => locale != null && Object.keys(locales).includes(locale);

export function CookieNotice() {
  const [locale, setLocale] = React.useState<SupportedLocales | null>();
  React.useEffect(() => {
    const lang = navigator.language?.substring(0, 2);
    return isSupportedLocale(lang) ? setLocale(lang) : setLocale('en');
  }, []);

  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    if (document.cookie.indexOf(COOKIE_NAME) === -1) {
      setShow(true);
    }
  }, []);

  const onAccept = () => {
    document.cookie = COOKIE_CONTENT;
    setShow(false);
  };

  if (!locale || !show) {
    return null;
  }

  const { message, accept } = locales[locale];

  return (
    <Box
      sx={{
        lineHeight: 3,
        py: 1,
        px: 1,
        fontSize: '12px',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        zIndex: 1000,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 2,
      }}
    >
      <Box>{message}</Box>
      <Button onClick={onAccept} variant="contained">
        {accept}
      </Button>
    </Box>
  );
}
