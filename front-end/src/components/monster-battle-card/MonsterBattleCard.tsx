import { Monster } from "../../models/interfaces/monster.interface"
import { BattleMonsterCard, BattleMonsterCardDivider, BattleMonsterPropertyTitle, BattleMonsterTitle, Image, ProgressBar } from "./MonsterBattleCard.styled"

type MonsterCardProps = {
    monster?: Monster | null
    title?: string
}

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ title, monster }) => {
    return (
        <BattleMonsterCard centralized={!monster}>
            {!monster && (
                <BattleMonsterTitle fontSize={36}>{title!}</BattleMonsterTitle>
            )}
            {monster && (
                <>
                    <Image src={monster.imageUrl} />
                    <BattleMonsterTitle fontSize={22}>{title!}</BattleMonsterTitle>
                    <BattleMonsterCardDivider />
                    <BattleMonsterPropertyTitle>HP</BattleMonsterPropertyTitle>
                    <ProgressBar value={monster.hp} variant="determinate" />
                    <BattleMonsterPropertyTitle>Attack</BattleMonsterPropertyTitle>
                    <ProgressBar value={monster.attack} variant="determinate"  />
                    <BattleMonsterPropertyTitle>Defense</BattleMonsterPropertyTitle>
                    <ProgressBar value={monster.defense} variant="determinate"  />
                    <BattleMonsterPropertyTitle>Speed</BattleMonsterPropertyTitle>
                    <ProgressBar value={monster.speed} variant="determinate"  />
                </>
            )}
        </BattleMonsterCard>
    )
}

export { MonsterBattleCard }