import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Preview,
  Row,
  Section,
  Text,
  Img,
} from '@react-email/components'
import * as React from 'react'

interface ConfirmacaoSeletivaProps {
  nome?: string
}

export const ConfirmacaoSeletiva = ({ nome }: ConfirmacaoSeletivaProps) => {
  return (
    <Html>
      <Head />
      <Preview>Email de confirmação da Seletiva.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img
              width={114}
              src={`https://utfs.io/f/dwPWeUvGjeshHo1rdSsunfACXgk6ZQGdOI1qiWVabsTy9Mvc`}
            />
          </Section>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorderInicio} />
              <Column style={sectionCenter} />
              <Column style={sectionBorderFim} />
            </Row>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>Ola {nome},</Text>
            <Text style={paragraph}>
              Seu regeitro foi feito na seletiva para o Jf imperadores.
            </Text>

            <Text style={paragraph}>
              A seletiva será realizada no dia 19 de Janeiro. Horário: 9 horas
              Local: Ginásio da Faefid-UFJF
            </Text>

            <Text style={paragraph}>
              Obrigado,
              <br />
              Jf Imperadores
            </Text>
          </Section>
        </Container>

        <Section style={footer}>
          <Row>
            <Text style={{ textAlign: 'center', color: '#706a7b' }}>
              © Jf Imperadores, Todos os direitos reservados.
              <br />
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  )
}

ConfirmacaoSeletiva.PreviewProps = {
  nome: 'alanturing',
  idReset: '12345',
} as ConfirmacaoSeletivaProps

export default ConfirmacaoSeletiva

const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif'

const main = {
  backgroundColor: '#efeef1',
  fontFamily,
}

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
}

const container = {
  maxWidth: '580px',
  margin: '30px auto',
  backgroundColor: '#ffffff',
}

const footer = {
  maxWidth: '580px',
  margin: '0 auto',
}

const content = {
  padding: '5px 20px 10px 20px',
}

const logo = {
  display: 'flex',
  justifyContent: 'center',
  alingItems: 'center',
  padding: 30,
}

const sectionsBorders = {
  width: '100%',
  display: 'flex',
}

const sectionBorderInicio = {
  borderBottom: '1px solid rgb(150, 112, 8)',
  width: '249px',
}

const sectionCenter = {
  borderBottom: '1px solid rgb(238,238,238)',
  width: '102px',
}

const sectionBorderFim = {
  borderBottom: '1px solid rgb(238,238,238)',
  width: '249px',
}
