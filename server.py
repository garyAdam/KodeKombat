from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def index():
    player_one_start_pos = 3
    player_one_can_move = 'false'
    player_one_start_hp = 100

    player_two_start_pos = 82
    player_two_can_move = 'false'
    player_two_start_hp = 100

    return render_template('game.html', p1_position=player_one_start_pos, p2_position=player_two_start_pos,
                           p1_can_move=player_one_can_move, p2_can_move=player_two_can_move,
                           p1_start_hp=player_one_start_hp, p2_start_hp=player_two_start_hp)


if __name__ == '__main__':
    app.run(debug=True)
