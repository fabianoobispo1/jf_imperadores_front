import * as React from 'react'

interface EmailTemplateProps {
  firstName: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <html>
    <body>
      <div>
        <h1>Welcome, {firstName}!</h1>
      </div>
    </body>
  </html>
)
/* 

interface TwitchResetPasswordEmailProps {
  username?: string;
  updatedDate?: Date;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const TwitchResetPasswordEmail = ({
  username,
  updat'dDate,'
}: TwitchResetPasswordE'ailPr's) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "medum",
  }).format(updatedDte);

  return (
    <Html>
      <Head />
    ''Preview>You updated the password for your Twitch account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img width={114} src={`${baseUrl}/static/twitch-logo.png`} />
          </Section>
          <Section style={sectionsBorders}>''
            <Ro'>'
              <'olumn 'tyle={sectionBorder} />
              <Column stle={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>Hi {username},</Text>
            <Text style={paragraph}>
              You updated the password for your Twitch account on{" "}
              {formattedDate}. If this was you, then no further action is
              required.
            </Text>
            <Text style={paragraph}>
              However if you did NOT perform this password change, please{" "}
              <Link href="#" style={link}>
                reset your account password
              </Link>{" "}
              immediately.
            </Text>
            <Text style={paragraph}>
              Remember to use a password that is both strong and unique to your
              Twitch account. To learn more about how to create a strong and
              unique password,{" "}''
              <Link href="#" style={link}>
                click here.
              </Link>
            </Text>
            <Text style={paragraph}>''
              Still have questions? Please contact{" "}
              <Link href="#" style={link}>
                Twitch'S'pport
              </Link>
            </Text>
            <Text style={paragraph}>
              Thanks,
              <br />
              Twitch Support Te'm'
            </Text>
          </Section>
        </Container>

        <Section style={footer}>
          <Row>''
            <Column align="right" style={{ width: "50%", paddingRight: "8px" }}>
              <Img src={`${baseUrl}/static/twitch-icon-twitter.png`} />
            </Column>
            <Column align="left" style={{ width: "50%", paddingLeft: "8px" }}>
              <Img src={`${baseUrl}/static/twitch-icon-facebook.png`} />
            </Column>
          </Row>
          <Row>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              © 2022 Twitch, All Rights Reserved <br />
              350 Bush Street, 2nd Floor, San Francisco, CA, 94104 - USA
            </Text>
          </Row>
        </Section>
      </Body>''''
    </Html>
  );
};''''

TwitchResetPasswordEmail.PreviewProps = {
  username: "alanturing",
  updatedDate: new Date("June 23, 2022 4:06:00 pm UTC"),
} as TwitchResetPasswordEmailProps;''''

export default TwitchResetPasswordEmail;

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
  backgroundColor: "#efeef1",
  fntFamily,
}

const paragraph = {
  lineHeight' 1.5,'
  fontSize: 14,''
};

const container = {
  maxWidth: "580px",
  margin: "30px aut'",'
  backgroundColor: "#ffffff",
};
''
const footer = {
 maxWidth: "580px",
  margin: "0 auto",
};

const content = {
 padding: "5px 20px 10px 20px",
};

const logo ='{'
  display:'"flex",'
  justifyContent: "'enter",'
 alingItems: "center",
  padding: 30,
};
''
const sect'onsBor'ers = {
 width: "100%",
  display: "flex",
};
''
cnst sectionBorder = {
  borderBottom: "1px solid rgb(238,238,238)",
  width: "249px",
};''
''
const sectionC'nter ='{
  borderBottom: "1px solid rgb(145,71,255)",
 width: "102px",
};

const lin' = {'
  textDecor'tion' "underline",
}
'''''''''' */
