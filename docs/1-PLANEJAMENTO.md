###\#1 PLANEJAMENTO.md
*Esse arquivo será tomado como anotação das decisões tomada para contrução desse encurtador de links.*

##### Qual é o problema?

A equipe de Marketing da sua empresa precisa de uma maneira de criar links curtos e fáceis de lembrar para incluir em publicações nas redes sociais, principalmente em imagens, onde não é possível selecionar e copiar uma URL.
*fonte: Tenda Digital*

##### O que vou entregar?
Uma serviço que receba links, seus nomes curtos e depois de encurtar devolva o link curto fácil de lembrar que deve ser usado.

#### MoSCoW - Priorização das entregas/funcionalidades
As funcionalidades foram priorizadas conforme abaixo, dentro da caixa de tempo estabelecida até dia 22/04, será contruído:

##### Must have:
- receber links com seus nomes curtos e devolver o link encurtado
- nomes curtos devem ser únicos
- redirecionar os links curtos para os links de origem
- documentação de como rodar esse projeto
- testes unitários e de integração
- publicação online da documentação e solução

##### Should have:
- uma página para receber as informações dos links e submeter
- uma página com a documentação da API que processa os links

##### Cold have:
- na página que cria os link exibir os últimos gerados naquele browser
- informação do número de acessos do link
- se 404, mostrar links parecidos

##### Won't have: (não será entregue, mas talvez quem sabe...)
- área de login com todos links e informações ligadas aquela conta
- print do conteúdo retornado pela url para criar a thumbnail se o link não é uma imagem
- analise da imagem do link para sugerir um nome quando o campo de nome curto não for preenchido

