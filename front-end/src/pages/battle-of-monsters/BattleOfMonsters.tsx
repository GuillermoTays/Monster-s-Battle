import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../app/hooks"
import { MonsterBattleCard } from "../../components/monster-battle-card/MonsterBattleCard"
import { MonstersList } from "../../components/monsters-list/MonstersList"
import { Title } from "../../components/title/Title"
import { fetchMonstersData } from "../../reducers/monsters/monsters.actions"
import { selectMonsters, selectSelectedMonster, selectSelectedComputerMonster } from "../../reducers/monsters/monsters.selectors"
import { BattleSection, PageContainer, StartBattleButton } from "./BattleOfMonsters.styled"
import { API_URL } from "../../constants/env"
import { Monster } from "../../models/interfaces/monster.interface"
import { BattleResult } from "../../components/battle-result/BattleResult"

const BattleOfMonsters = () => {
    const dispatch = useAppDispatch()
    const [winnerMonster, setWinnerMonster] = useState<Monster>()

    const monsters = useSelector(selectMonsters)
    const selectedMonster = useSelector(selectSelectedMonster)
    const selectedComputerMonster = useSelector(selectSelectedComputerMonster)

    useEffect(() => {
        dispatch(fetchMonstersData())
    }, [dispatch]);

    const handleStartBattleClick = async () => {
        // Fight!
        if (!selectedMonster || !selectedComputerMonster) return;
        const result = await fetch(`${API_URL}/battle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                monsterAId: selectedMonster.id,
                monsterBId: selectedComputerMonster.id
            })
        }).then((response) => response.json());
        
        const { winner } = result;
        if (winner === selectedMonster.id) {
            setWinnerMonster(selectedMonster)
        } else {
            setWinnerMonster(selectedComputerMonster)
        }
    }

    return (
        <PageContainer>
            <Title>Battle of Monsters</Title>

            <MonstersList monsters={monsters} />

            {winnerMonster && (
                <BattleResult>{winnerMonster.name} wins!</BattleResult>
            )}

            <BattleSection>
                <MonsterBattleCard title={selectedMonster?.name || "Player"} monster={selectedMonster}></MonsterBattleCard>
                <StartBattleButton data-testid="start-battle-button"  disabled={selectedMonster === null} onClick={handleStartBattleClick}>Start Battle</StartBattleButton>
                <MonsterBattleCard title={selectedComputerMonster?.name || 'Computer'} monster={selectedComputerMonster}></MonsterBattleCard>
            </BattleSection>
        </PageContainer>
    )
}

export { BattleOfMonsters }