# Labenu Music Awards
## [POSTMAN] (https://documenter.getpostman.com/view/20352445/UzQvrQ9H)
A API representa o sistema de gerenciamento do **LAMA**, *Labenu Musical Awards*, um festival com várias bandas famosas para formaturas! 

O festival terá duração fixa de 3 dias (sexta, sábado e domingo), começando sempre as 08h e acabando as 23h, totalizando 15h de show a cada dia. As funcionalidades do sistema estão descritas a seguir:

- 1. Cadastro
    
    O nosso sistema deve permitir o registro aos usuários que irão usá-lo. Para se cadastrar, é necessário passar um email, um nome e uma senha, e também uma função dentro do sistema. Você pode ser um cliente (usuário normal) ou um administrador do sistema (admin). O usuário deve poder se logar automaticamente após o cadastro. 
    
- 2. Login
    
    Para realizar o login, basta informar seu e-mail e a sua senha. O retorno deve conter o token de autenticação do usuário. 
    
- 3. Endpoint de registrar banda
    
    O nosso sistema deve deixar registrado todas as bandas que participarão dos três dias de shows. Para uma banda ser criada, precisamos das informações: nome, gênero musical principal a qual ela se identifica e o nome de um responsável (que pode ser qualquer membro dela). Não podem existir duas bandas com o mesmo nome. **Somente administradores** podem registrar bandas. 
    
- 4. Endpoint de visualização de detalhes sobre a banda
    
    Esse endpoint deve receber o id **ou** o nome da banda e retornar todas as informações salvas sobre ela.
    
- 5. Endpoint de adicionar um show a um dia
    
    Para cadastrar um show, o endpoint precisa do id da banda, o dia (sexta, sábado ou domingo) e o horário em que ela irá se apresentar. Deve haver uma validação para indicar se o horário é válido (ou seja, se está entre 08h e 23h). Além disso os shows só podem ser marcados em horários redondos, ou seja, pode ser 08h - 09h ou 09h - 13h mas não pode ser 09h - 10h30 ou 10h30 - 14h.
    
    Caso já exista um show marcado para o dia e o horário em questão, o endpoint deve retornar um erro. 
    
- 6. Endpoint de pegar todos os shows de uma data
    
    Recebe um dia (sexta, sábado ou domingo) e retorna todos os shows daquela data (ordenados pelo horário), mostrando somente o nome da banda e o gênero musical principal.
    
- 7. Endpoint de criar um ingresso
        
    O caso de uso desse endpoint é o administrador do sistema querendo criar ingressos para serem vendidos. Para criar, precisa indicar: nome do ingresso, valor, o id do evento e a quantidade de ingressos. **Somente administradores** podem registrar ingressos.
        
- 8. Comprar ingresso
        
     Deve receber a quantidade de ingressos e o nome. Deve retornar erros específicos para um nome inválido, ingresso não encontrado e quantidade inválida (ou seja se existem menos ingressos disponíveis do que o usuário quer comprar)