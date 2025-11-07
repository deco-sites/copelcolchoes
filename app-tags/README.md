# Sistema de Tags de Produtos

Este documento explica como configurar o sistema de tags de produtos na sua loja VTEX através do CMS do Deco.cx.

## Configuração Inicial

1. No CMS do Deco.cx, acesse o aplicativo "Tags de Produtos"
2. Configure suas credenciais da VTEX:
   - **Account Name**: O nome da sua conta VTEX (ex: `minhaloja`)
   - **X-VTEX-API-AppKey**: Chave da API da VTEX
   - **X-VTEX-API-AppToken**: Token da API da VTEX

## Tipos de Tags Disponíveis

### 1. Tags de Desconto Automático

Ativa ou desativa o badge de desconto automático que já existe na loja.

- **Ativar Badge de Desconto Automático**: `true` para mostrar o badge com percentual de desconto, `false` para ocultar.

### 2. Tags de Texto Personalizadas

Permite criar tags com texto personalizado para promoções e ofertas.

#### Campos de Configuração:

- **Nome da Tag**: Nome interno para identificação (ex: "Promoção Black Friday")
- **Ativar Tag**: `true` para exibir esta tag
- **Produtos Alvo**: Selecione categoria ou coleção para aplicar a tag
  - **ID da Categoria**: ID da categoria VTEX (ex: "123")
  - **ID da Coleção**: ID da coleção VTEX (ex: "456")
- **Data de Início/ Data de Fim**: Defina um período para a campanha
- **Posição**: Onde a tag aparecerá no produto
  - `top-left`: Superior esquerdo
  - `top-center`: Superior centro
  - `top-right`: Superior direito
  - `bottom-left`: Inferior esquerdo
  - `bottom-center`: Inferior centro
  - `bottom-right`: Inferior direito
  - `center`: Centro

#### Personalização Visual:

- **Conteúdo do Texto**: Texto que aparecerá na tag (ex: "30% OFF")
- **Cor de Fundo**: Cor de fundo da tag (ex: "#FF0000")
- **Cor do Texto**: Cor do texto (ex: "#FFFFFF")
- **Cor da Borda**: Cor da borda (opcional)
- **Borda Arredondada**: Raio da borda em pixels (ex: 10)
- **Ícone (opcional)**: Ícone para aparecer antes ou depois do texto
- **Posição do Ícone**: "left" (esquerda) ou "right" (direita)

### 3. Tags de Imagem

Permite usar uma imagem como tag.

#### Campos de Configuração:

- **Nome da Tag**: Nome interno para identificação
- **Imagem da Tag**: Upload da imagem
- **Posição**: Onde a imagem aparecerá (mesmas opções das tags de texto)
- **Largura/Altura**: Dimensões da imagem em pixels
- **Configurações de Alvo e Data**: Mesmas das tags de texto

### 4. Tags de Terceira Compra

Tag especial para promoções do tipo "pegue 3, pague X".

#### Campos de Configuração:

- **Nome da Tag**: Nome interno para identificação
- **Percentual de Desconto**: Porcentagem de desconto (ex: 70)
- **Texto do Rótulo**: Texto antes do preço (ex: "3ª peça por")
- **Configurações de Cores**:
  - **Cor de Fundo do Rótulo**: Cor do fundo do texto
  - **Cor do Texto do Rótulo**: Cor do texto
  - **Cor de Fundo do Preço**: Cor do fundo do preço
  - **Cor do Texto do Preço**: Cor do preço
- **Configurações de Alvo, Posição e Data**: Mesmas das outras tags

## Exemplos Práticos

### Exemplo 1: Tag de Promoção Sazonal
```
Nome: "Verão 2024"
Ativar Tag: true
Produtos Alvo: Categoria "Vestidos de Verão"
Data de Início: 01/12/2023
Data de Fim: 28/02/2024
Posição: top-right
Conteúdo do Texto: "40% OFF"
Cor de Fundo: #FF6B6B
Cor do Texto: #FFFFFF
```

### Exemplo 2: Tag de Frete Grátis
```
Nome: "Frete Grátis"
Ativar Tag: true
Produtos Alvo: Categoria "Eletrônicos"
Posição: bottom-center
Conteúdo do Texto: "Frete Grátis"
Cor de Fundo: #4CAF50
Cor do Texto: #FFFFFF
Ícone: Icone de caminhão
Posição do Ícone: left
```

### Exemplo 3: Tag de Terceira Peça
```
Nome: "Leve 3 Pague 2"
Ativar Tag: true
Produtos Alvo: Categoria "Roupas Infantis"
Percentual de Desconto: 67
Texto do Rótulo: "3ª peça por"
Cor de Fundo do Rótulo: #8D8D8D
Cor do Texto do Rótulo: #FFFFFF
Cor de Fundo do Preço: #585857
Cor do Texto do Preço: #FFFFFF
Posição: bottom-center
```

## Configuração de Destino das Tags

### Por Categoria
1. Obtenha o ID da categoria VTEX
2. Insira no campo "ID da Categoria"
3. A tag aparecerá em todos os produtos desta categoria

### Por Coleção
1. Obtenha o ID da coleção VTEX
2. Insira no campo "ID da Coleção"
3. A tag aparecerá em todos os produtos desta coleção

## Dicas de Boas Práticas

1. **Cores Contrastantes**: Use cores com bom contraste para garantir legibilidade
2. **Tamanho do Texto**: Mantenha o texto curto e direto
3. **Não Exagere**: Use no máximo 2-3 tags por produto para não poluir visualmente
4. **Teste Visualmente**: Verifique como as tags aparecem em diferentes dispositivos
5. **Datas**: Configure sempre datas de início e fim para campanhas sazonais

## Solução de Problemas

### A tag não está aparecendo?
- Verifique se a opção "Ativar Tag" está marcada
- Confirme se o produto pertence à categoria ou coleção selecionada
- Verifique as datas de início e fim da campanha
- Limpe o cache do navegador

### A tag está sobrepondo outras informações?
- Altere a posição da tag
- Ajuste o tamanho da imagem ou do texto
- Verifique em diferentes tamanhos de tela

### As cores não estão aparecendo corretamente?
- Verifique se os valores de cor estão no formato hexadecimal (#RRGGBB)
- Teste com diferentes combinações de cores para melhor contraste

## Suporte

Para dúvidas adicionais ou problemas técnicos, entre em contato com a Agência N1.
