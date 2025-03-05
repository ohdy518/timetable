"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState, useEffect } from "react"

interface ClassConfig {
  school: string
  grade: string
  class: string
  lunchAfter: number
}

interface ConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  classConfig: ClassConfig
  onConfigChange: (config: ClassConfig) => void
  onSave: (config: ClassConfig) => void
}

export function ConfigDialog({ open, onOpenChange, classConfig, onConfigChange, onSave }: ConfigDialogProps) {
  const [tempConfig, setTempConfig] = useState(classConfig)

  useEffect(() => {
    if (open) {
      setTempConfig(classConfig)
    }
  }, [open, classConfig])

  const handleSave = () => {
    onSave(tempConfig)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark:bg-neutral-900 dark:border-neutral-800" onKeyDown={handleKeyDown}>
        <DialogHeader>
          <DialogTitle className="dark:text-neutral-100">설정</DialogTitle>
          <DialogDescription className="dark:text-neutral-400">
            학급 정보 등을 설정해 주세요. 
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div>
            <Label className="dark:text-neutral-200">학교</Label>
            <Input
              value={tempConfig.school}
              onChange={(e) => setTempConfig({ ...tempConfig, school: e.target.value })}
              className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-400"
              placeholder="학교 이름을 입력하세요"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.stopPropagation() // Prevent double handling
                  handleSave()
                }
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="dark:text-neutral-200">학년</Label>
              <Select
                value={tempConfig.grade}
                onValueChange={(value) => setTempConfig({ ...tempConfig, grade: value })}
              >
                <SelectTrigger className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100">
                  <SelectValue placeholder="학년 선택" />
                </SelectTrigger>
                <SelectContent className="dark:bg-neutral-800 dark:border-neutral-700">
                  {[1, 2, 3].map((grade) => (
                    <SelectItem 
                      key={grade} 
                      value={grade.toString()}
                      className="dark:text-neutral-100 dark:focus:bg-neutral-700"
                    >
                      {grade}학년
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="dark:text-neutral-200">반</Label>
              <Select
                value={tempConfig.class}
                onValueChange={(value) => setTempConfig({ ...tempConfig, class: value })}
              >
                <SelectTrigger className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100">
                  <SelectValue placeholder="반 선택" />
                </SelectTrigger>
                <SelectContent className="dark:bg-neutral-800 dark:border-neutral-700">
                  {Array.from({length: 15}, (_, i) => i + 1).map((classNum) => (
                    <SelectItem 
                      key={classNum} 
                      value={classNum.toString()}
                      className="dark:text-neutral-100 dark:focus:bg-neutral-700"
                    >
                      {classNum}반
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label className="dark:text-neutral-200">점심시간</Label>
            <Select
              value={tempConfig.lunchAfter.toString()}
              onValueChange={(value) => setTempConfig({ ...tempConfig, lunchAfter: parseInt(value) })}
            >
              <SelectTrigger className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100">
                <SelectValue placeholder="점심시간 선택" />
              </SelectTrigger>
              <SelectContent className="dark:bg-neutral-800 dark:border-neutral-700">
                {[3, 4, 5].map((period) => (
                  <SelectItem 
                    key={period} 
                    value={period.toString()}
                    className="dark:text-neutral-100 dark:focus:bg-neutral-700"
                  >
                    {period}교시 후
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleSave}>
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
