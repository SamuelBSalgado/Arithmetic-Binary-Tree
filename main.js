// class Node{
//     constructor(value){
//         this._value = value;
//         this._izq = null;
//         this._der = null;
//     }

//     add(value){
//         if(value < this._value){
//             this.addLeft(value);
//         } else{
//             this.addRight(value);
//         }
//     }

//     addLeft(value){
//         if(this._izq){
//             this._izq.add(value);
//         } else{
//             this._izq = new Node(value);
//         }
//     }

//     addRight(value){
//         if(this._der){
//             this._der.add(value);
//         } else{
//             this._der = new Node(value);
//         }
//     }
// }

// const head = new Node(10);
// head.add(15);
// head.add(11);
// head.add(7);
// console.log(head);


class Node{
    constructor(descRoot){
        this._descRoot = descRoot;
        this._right = null;
        this._left = null;
        this._next = null;
        this._last = null;
    }
}

class BinaryTree{
    constructor(){
        this._root = null;
        this._newRoot = null;
        this._Calc = [];
        this._RIDcalc = [];
    }

    add(value){
        if(!this._root){
            this._root = value;
        } else{
        let temp = this._root;
        while(temp._next){
            temp = temp._next;
        }
        value._last = temp;
        temp._next = value;
        }
    }

    IDR(){
        if(!this._newRoot){
            return null;
        } else{
            this.IDR_recursiva(this._newRoot);
        }
    }

    IDR_recursiva(value){
        if(value._left){
            this.IDR_recursiva(value._left);
        }
        if(value._right){
            this.IDR_recursiva(value._right);
        }
        console.log(value._descRoot);
        this._Calc.push(value._descRoot);
    }

    RID(){
        if(!this._newRoot){
            return null;
        } else{
            this.RID_recursiva(this._newRoot);
        }
    }

    RID_recursiva(value){
        console.log(value._descRoot);
        this._RIDcalc.push(value._descRoot);
        if(value._left){
            this.RID_recursiva(value._left);
        }
        if(value._right){
            this.RID_recursiva(value._right);
        }
    }

    PreSolving(){
        let rightSide;
        let leftSide;
        let aux = [];
        let res;
        let calculation = "";
        for(let a=this._RIDcalc.length-1; a>=0; a--){
            if(typeof (this._RIDcalc[a]) == "number"){
                aux.push(this._RIDcalc.pop());
            } else{
                leftSide = aux.pop();
                calculation = this._RIDcalc[a];
                this._RIDcalc.pop();
                rightSide = aux.pop();
                if(calculation == "/"){
                    res = leftSide/rightSide;
                    aux.push(res);
                } else if(calculation == "*"){
                    res = leftSide*rightSide;
                    aux.push(res);
                } else if(calculation == "+"){
                    res = leftSide+rightSide;
                    aux.push(res);
                } else if(calculation == "-"){
                    res = leftSide-rightSide;
                    aux.push(res);
                }
            }
        }
        res = aux[0];
        return res;
    }

    PostSolving(){
        let rightSide;
        let leftSide;
        let aux = [];
        let calculation = "";
        for(let a=0; a<this._Calc.length; a++){
            if(typeof (this._Calc[0]) == "number"){
                aux.push(this._Calc[0]);
                for(let b=0; b<this._Calc.length; b++){
                    this._Calc[b] = this._Calc[b+1];
                }
                this._Calc[this._Calc.length-1] = null;
            } else{
                rightSide = aux.pop();
                calculation = this._Calc[0];
                for(let c=0; c<this._Calc.length; c++){
                    this._Calc[c] = this._Calc[c+1];
                }
                this._Calc[this._Calc.length-1] = null;
                leftSide = aux.pop();

                /*<----------------Casos------------------>*/
                if(calculation == "/"){
                    rightSide = leftSide/rightSide;
                    aux.push(rightSide);
                }
                if(calculation == "*"){
                    rightSide = leftSide*rightSide;
                    aux.push(rightSide);
                }
                if(calculation == "+"){
                    rightSide = leftSide+rightSide;
                    aux.push(rightSide);
                }
                if(calculation == "-"){
                    rightSide = leftSide-rightSide;
                    aux.push(rightSide);
                }
            }
        }
        return rightSide;
    }

    buildTree(){
        let temp = this._root;
        while(temp._next){
            //Primer nivel de importancia
            if(temp._descRoot == "/" || temp._descRoot == "*"){
                temp._right = temp._next;
                temp._left = temp._last;
                this._newRoot = temp;
                if(temp._next._next){
                    let aux = temp._next._next;
                    temp._next = aux;
                    aux._last = temp;
                }
                if(temp._last._last){
                    let aux2 = temp._last._last;
                    temp._last = aux2;
                    aux2._next = temp;
                }
            }
        temp = temp._next;
        }
        temp = this._root;
        while(temp._next){
            //Segundo nivel de importancia
            if(temp._descRoot == "+" || temp._descRoot == "-"){
                temp._right = temp._next;
                temp._left = temp._last;
                this._newRoot = temp;
                if(temp._next._next){
                    let aux = temp._next._next;
                    temp._next = aux;
                    aux._last = temp;
                }
                if(temp._last._last){
                    let aux2 = temp._last._last;
                    temp._last = aux2;
                    aux2._next = temp;
                }
            }
            temp = temp._next;
        }
    }
}

//Inicializar Árbol y crear nodos (números y signos)
const tree = new BinaryTree();
let node1 = new Node(8);
let node2 = new Node("+");
let node3 = new Node(5);
let node4 = new Node("/");
let node5 = new Node(1);
let node6 = new Node("-");
let node7 = new Node(1);
let node8 = new Node("/");
let node9 = new Node(7);
let node10 = new Node("*");
let node11 = new Node(7);
let node12 = new Node("+");
let node13 = new Node(4);
let node14 = new Node("-");
let node15 = new Node(6);

//Agregar
tree.add(node1);
tree.add(node2);
tree.add(node3);
tree.add(node4);
tree.add(node5);
tree.add(node6);
tree.add(node7);
tree.add(node8);
tree.add(node9);
tree.add(node10);
tree.add(node11);
tree.add(node12);
tree.add(node13);
tree.add(node14);
tree.add(node15);

//Armar el árbol
tree.buildTree();

//Mostrar árbol entero
console.log("Árbol binario desplegable");
console.log(tree._newRoot);

//Mostrar lista de Pre Order
console.log("RID (Pre Order)");
tree.RID();

//Mostrar lista de Post Order
console.log("IDR (Post Order)");
tree.IDR();

//Resultados
console.log("Resultado con proceso RID (Pre Order)");
console.log(tree.PreSolving());

console.log("Resultado con proceso IDR (Post Order)");
console.log(tree.PostSolving());