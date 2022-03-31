//Global var 
var c = [9];
var n1 = [5];
var n2 = [5];
var endgame = false;

class Bootloader extends Phaser.Scene
{
    constructor()
    {
        super({
            key: 'Bootloader' 
        });
    }

    init(){
        console.log("Juego Iniciado");
    }

    preload(){
        this.load.path = "./assets/";
        this.load.image("drop", "drop.png");
        this.load.image("fondo", "fondoship.png");
        this.load.image("nt1", "nt1.png");
        this.load.image("nt2", "nt2.png");
        this.load.image("nt3", "nt3.png");
        this.load.image("nt4", "nt4.png");
        this.load.image("nt5", "nt5.png");
        this.load.image("ne1", "ne1.png");
        this.load.image("ne2", "ne2.png");
        this.load.image("ne3", "ne3.png");
        this.load.image("ne4", "ne4.png");
        this.load.image("ne5", "ne5.png");
        this.load.image("tablero", "tablero.png");
        this.load.image("reset", "reset.png");

        //Musica
        this.load.audio("mfondo", "./musica/fondom.mp3");
        this.load.audio("f1", "./musica/f1.mp3");
        this.load.audio("f2", "./musica/f2.mp3");
        this.load.audio("mdraw", "./musica/draw.mp3");
        this.load.audio("mendgame", "./musica/endgame.mp3");
    }

    create()
    {
        //Timer
        this.timer = 0;
        this.start = this.getTime();
        
        const eventos = Phaser.Input.Events;
        this.state = 0;

        //Letreros
        this.winp1 = this.add.text(40,280, '', {font: 'bold 70pt anurati', fill: '#B8F2F2'});
        this.winp2 = this.add.text(40,280, '', {font: 'bold 70pt anurati', fill: '#B8F2F2'});
        this.draw = this.add.text(130,300, '', {font: 'bold 70pt anurati', fill: '#B8F2F2'});

        //Reset
        this.reset = this.add.image(340, 420, "reset").setInteractive();
        this.reset.setVisible(false);
        this.reset.setDepth(3);
        
        this.fondo = this.add.image(510, 320, "fondo"); 
        this.tablero = this.add.image(340, 420, "tablero"); 
        this.fondo.setDepth(1);
        this.tablero.setDepth(2); 
        this.nt = [5];
        this.ne = [5];
        this.drop = [9];
        this.id = 0;
        this.turno = 1;

        //naves
        this.nt[0] = this.add.image(340, 420, "nt1").setVisible(false);
        this.nt[1] = this.add.image(340, 420, "nt2").setVisible(false);
        this.nt[2] = this.add.image(340, 420, "nt3").setVisible(false);
        this.nt[3] = this.add.image(340, 420, "nt4").setVisible(false);
        this.nt[4] = this.add.image(340, 420, "nt5").setVisible(false);

        this.ne[0] = this.add.image(340, 420, "ne1").setVisible(false);
        this.ne[1] = this.add.image(340, 420, "ne2").setVisible(false);
        this.ne[2] = this.add.image(340, 420, "ne3").setVisible(false);
        this.ne[3] = this.add.image(340, 420, "ne4").setVisible(false);
        this.ne[4] = this.add.image(340, 420, "ne5").setVisible(false);

        //textos
        this.winp1.setDepth(3);
        this.winp1.setStroke('#6B7071', 6);

        this.winp2.setDepth(3);
        this.winp2.setStroke('#6B7071', 6);

        this.draw.setDepth(3);
        this.draw.setStroke('#6B7071', 6);

        //Musica
        this.track1 = this.sound.add("mfondo");
        this.f1 = this.sound.add("f1");
        this.f2 = this.sound.add("f2");
        this.mdraw = this.sound.add("mdraw");
        this.fin = this.sound.add("mendgame");
        this.track1.setVolume(0.8);
        this.track1.setLoop(true);
        this.track1.play();

        for(var i = 0; i<5; i++)
        {
            n1[i] = 0;
            n2[i] = 0;
            this.nt[i].setInteractive();
            this.ne[i].setInteractive();
            this.input.setDraggable(this.nt[i]);
            this.input.setDraggable(this.ne[i]);
        }

        for(var i = 0; i < 9; i++)
        {
            c[i] = 0;
            this.drop[i] = this.add.image(340, 420, "drop").setInteractive();
            this.drop[i].id = i;
        }

        for(var i = 0; i < 5; i++)
        {
            this.nt[i].setScale(0.08);
            this.nt[i].setDepth(2);
            this.nt[i].id = 1;
            this.nt[i].num = i;
            this.ne[i].setScale(0.08);
            this.ne[i].id = 2;
            this.ne[i].num = i;
            this.ne[i].setDepth(2);
        }
        
        this.tablero.setScale(0.2);

        //Acomodar Drop zone
        var cont = 0;
        const x1 = 130;
        const y1 = 128;
        for(var i = 0; i < 3; i++)
        {
            for(var j = 0; j < 3; j++)
            {
                this.drop[cont].y = 548 - (y1*i);
                this.drop[cont].x = 215 + (x1*j);
                this.drop[cont].setScale(1.2);
                this.drop[cont].setDepth(2);
                this.drop[cont].setDepth(-1);
                this.drop[cont].input.dropZone = true;
                cont++;
            }
        }

        //Acomodar naves
        this.nt[0].x = 730;
        this.nt[0].y = 240;
        this.nt[1].x = 730+110;
        this.nt[1].y = 240;
        this.nt[2].x = 730+220;
        this.nt[2].y = 240;
        this.nt[3].x = 730;
        this.nt[3].y = 240+110;
        this.nt[4].x = 730+110;
        this.nt[4].y = 240+110;

        this.ne[0].x = 730;
        this.ne[0].y = 460;
        this.ne[1].x = 730+110;
        this.ne[1].y = 460;
        this.ne[2].x = 730+220;
        this.ne[2].y = 460;
        this.ne[3].x = 730+110;
        this.ne[3].y = 460+110;
        this.ne[4].x = 730+220;
        this.ne[4].y = 460+110;

        for(var i = 0; i < 5; i++)
        {
            this.nt[i].setVisible(true);
            this.ne[i].setVisible(true);
        }

        //DRAG AND DROP
        this.input.on(eventos.DRAG_START, (pointer, obj, dragX, dragY) =>
        {
            this.f1.setVolume(0.08);
            this.f1.play();
            obj.setScale(0.07);
        });
    
        this.input.on(eventos.DRAG, (pointer, obj, dragX, dragY)=>{
            obj.x = dragX;
            obj.y = dragY;
        });

        this.input.on(eventos.DRAG_ENTER, (pointer, obj, dropzone)=>{
            dropzone.setTint(0xff0000);
        });

        this.input.on(eventos.DRAG_LEAVE, (pointer, obj, dropzone)=>{
            dropzone.clearTint();
        });

        //pone enmedio de la dropzone a los assets
        this.input.on(eventos.DROP, (pointer, obj, dropzone)=>{
            obj.x = dropzone.x;
            obj.y = dropzone.y;
            this.id = dropzone.id;
        });

        //Drag End
        this.input.on(eventos.DRAG_END, (pointer, obj, dropzone)=>{
            this.timer = 0;
            obj.setScale(0.08);
            if(!dropzone)
            {
                obj.x = obj.input.dragStartX;
                obj.y = obj.input.dragStartY;
            }
            else
            {
                this.f2.setVolume(0.08);
                this.f2.play();
                this.drop[this.id].input.dropZone = false;
                this.drop[this.id].disableInteractive();
                obj.disableInteractive();
                obj.num;
                c[this.id] = obj.id;
                if(obj.id == 1)
                {
                        n1[obj.num] = 1;
                        this.turno = 2;
                }
                else{
                        n2[obj.num] = 1;
                        this.turno = 1;
                }
            }
        });

        //cambia color si esta en el reset
        this.reset.on(eventos.POINTER_OVER, function(){
            this.setTint(0xBDF0F0);
        });

        this.reset.on(eventos.POINTER_OUT, function(){
            this.clearTint();
        });

        this.reset.on(eventos.POINTER_DOWN, (pointer) => {
            setTimeout(() => {
                for(var i = 0; i<5; i++)
                {
                    n1[i] = 0;
                    n2[i] = 0;
                }
                for(var i = 0; i<9; i++)
                {
                    c[i] = 0;
                }
                this.id = 0;
                this.turno = 1;
                endgame = false;
                this.state = 0;
                this.fin.stop();
                this.mdraw.stop();
                this.track1.stop();
                this.scene.restart();
            }, 1000);
        });
    }

    getTime(){
        let tiempo = new Date();
        return tiempo.getTime();
    }

    showDelta(){
        let elapsed = this.getTime() - this.start;
        this.start = this.getTime();
        return elapsed;
    }

    update(time, delta)
    {
        //Determinar los turnos
        this.deltatime = this.showDelta();
        if(this.turno == 1)
        {
            for(var i = 0; i < 5 ; i++)
            {
                if(n1[i] == 1)
                {
                    this.nt[i].disableInteractive();
                }
                else if(n1[i] == 0)
                {
                    this.nt[i].setInteractive();
                }
                this.ne[i].disableInteractive();
            }
        }
        else if(this.turno == 2)
        {
            for(var i = 0; i < 5 ; i++)
            {
                if(n2[i] == 1)
                {
                    this.ne[i].disableInteractive();
                }
                else if(n2[i] == 0)
                {
                    this.ne[i].setInteractive();
                };
                this.nt[i].disableInteractive();
            }
        }

        //Determinar al ganador 
        if((c[0] == 1 && c[1] == 1 && c[2] == 1) || (c[3] == 1 && c[4] == 1 && c[5] == 1) || (c[6] == 1 && c[7] == 1 && c[8] == 1))
        {
            for(var i = 0; i < 5; i++)
            {
                this.ne[i].disableInteractive();
                this.nt[i].disableInteractive();
            }
            for(var i = 0; i < 9; i++)
            {
                this.drop[i].disableInteractive();
            }
            //Mensaje de ganador
            this.winp1.setText("JUGADOR 1 \n       GANA");
            endgame = true;
        }
        else if((c[0] == 1 && c[3] == 1 && c[6] == 1) || (c[1] == 1 && c[4] == 1 && c[7] == 1) || (c[2] == 1 && c[5] == 1 && c[8] == 1))
        {
            for(var i = 0; i < 5; i++)
            {
                this.ne[i].disableInteractive();
                this.nt[i].disableInteractive();
            }
            for(var i = 0; i < 9; i++)
            {
                this.drop[i].disableInteractive();
            }
            //Mensaje de ganador
            this.winp1.setText("JUGADOR 1 \n       GANA");
            endgame = true;
        }
        else if((c[0] == 1 && c[4] == 1 && c[8] == 1) || (c[2] == 1 && c[4] == 1 && c[6] == 1))
        {
            for(var i = 0; i < 5; i++)
            {
                this.ne[i].disableInteractive();
                this.nt[i].disableInteractive();
            }
            for(var i = 0; i < 9; i++)
            {
                this.id = 0;
                this.turno = 1;
                this.drop[i].disableInteractive();
            }
            //Mensaje de ganador
            this.winp1.setText("JUGADOR 1 \n       GANA");
            endgame = true;
        } 
        else if((c[0] == 2 && c[1] == 2 && c[2] == 2) || (c[3] == 2 && c[4] == 2 && c[5] == 2) || (c[6] == 2 && c[7] == 2 && c[8] == 2) )
        {
            for(var i = 0; i < 5; i++)
            {
                this.ne[i].disableInteractive();
                this.nt[i].disableInteractive();
            }
            for(var i = 0; i < 9; i++)
            {
                this.drop[i].disableInteractive();
            }
            //Mensaje de ganador
            this.winp2.setText("JUGADOR 2 \n       GANA");
            endgame = true;
        }
        else if((c[0] == 2 && c[3] == 2 && c[6] == 2) || (c[1] == 2 && c[4] == 2 && c[7] == 2) || (c[2] == 2 && c[5] == 2 && c[8] == 2))
        {
            for(var i = 0; i < 5; i++)
            {
                this.ne[i].disableInteractive();
                this.nt[i].disableInteractive();
            }
            for(var i = 0; i < 9; i++)
            {
                this.drop[i].disableInteractive();
            }
            //Mensaje de ganador
            this.winp2.setText("JUGADOR 2 \n       GANA");
            endgame = true;
        }
        else if((c[0] == 2 && c[4] == 2 && c[8] == 2) || (c[2] == 2 && c[4] == 2 && c[6] == 2))
        {
            for(var i = 0; i < 5; i++)
            {
                this.ne[i].disableInteractive();
                this.nt[i].disableInteractive();
            }
            for(var i = 0; i < 9; i++)
            {
                this.drop[i].disableInteractive();
            }
            //Mensaje de ganador
            this.winp2.setText("JUGADOR 2 \n       GANA");
            endgame = true;
        }
        else if(c[0] != 0 && c[1] != 0 && c[2] != 0 && c[3] != 0 && c[4] != 0 && c[5] != 0 && c[6] != 0 && c[7] != 0 && c[8] != 0)
        {
            for(var i = 0; i < 5; i++)
            {
                this.ne[i].disableInteractive();
                this.nt[i].disableInteractive();
            }
            for(var i = 0; i < 9; i++)
            {
                this.drop[i].disableInteractive();
            }
            //Mensaje de ganador
            this.draw.setText("EMPATE");
            endgame = true;
        }
        
        //Reiniciar escena
        this.timer += this.deltatime;
        if(endgame == true)
        {
            if(this.timer > 2000)
            {
                this.reset.setVisible(true);
                this.reset.setInteractive();
            }
        }
        
    }
}

export default Bootloader;